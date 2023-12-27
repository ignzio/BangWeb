import { Empty } from "../../../Model/ServerMessage";
import { count } from "../../../Utils/ArrayUtils";
import { ChangeField } from "../../../Utils/UnionUtils";
import { CardEffect } from "./CardData";
import { CardTarget } from "./CardEnums";
import { calcPlayerDistance, cardHasTag, checkCardFilter, checkPlayerFilter, getCardColor, getEquipTarget, isEquipCard } from "./Filters";
import { Card, GameTable, KnownCard, Player, getCard, getPlayer, isCardKnown } from "./GameTable";
import { CardId, CardNode, GameString, PlayerId, RequestStatusArgs, StatusReadyArgs } from "./GameUpdate";

export type RequestStatusUnion = RequestStatusArgs | StatusReadyArgs | Empty;

export type GamePrompt =
    { type: 'none' } |
    { type: 'yesno', message: GameString, response: boolean } |
    { type: 'playpick', card: KnownCard };

export interface PickCardSelection {
    picked_card: CardId;
    mode: 'finish';
}

export interface EffectContext {
    repeat_card?: CardId;
    card_choice?: CardId;
    traincost?: CardId;
    train_advance?: number;
    skipped_player?: PlayerId;
    ignore_distances?: boolean;
}

export interface PlayCardSelection {
    playing_card: KnownCard | null;
    targets: CardTarget[];

    modifiers: {
        modifier: KnownCard;
        targets: CardTarget[];
    }[];

    context: EffectContext;
    mode: 'start' | 'target' | 'modifier' | 'equip' | 'finish';
}

export function newPlayCardSelection(): PlayCardSelection {
    return {
        playing_card: null,
        targets: [],
        modifiers: [],
        context: {},
        mode: 'start'
    };
}

export interface TargetSelector {
    request: RequestStatusUnion;
    prompt: GamePrompt;
    selection:
        PickCardSelection |
        PlayCardSelection |
        { mode: 'start' };
}

export type RequestSelector = ChangeField<TargetSelector, 'request', RequestStatusArgs>;
export type StatusReadySelector = ChangeField<TargetSelector, 'request', StatusReadyArgs>;
export type PlayingSelector = ChangeField<TargetSelector, 'selection', PlayCardSelection>;
export type PickingSelector = ChangeField<TargetSelector, 'selection', PickCardSelection>;
export type PlayingSelectorTable = ChangeField<GameTable, 'selector', PlayingSelector>;

export function isResponse(selector: TargetSelector): selector is RequestSelector {
    return 'respond_cards' in selector.request;
}

export function isStatusReady(selector: TargetSelector): selector is StatusReadySelector {
    return 'play_cards' in selector.request;
}

export function isSelectionPlaying(selector: TargetSelector): selector is PlayingSelector {
    return 'playing_card' in selector.selection;
}

export function isSelectionPicking(selector: TargetSelector): selector is PickingSelector {
    return 'picked_card' in selector.selection;
}

export function checkSelectionPlaying(selector: TargetSelector): asserts selector is PlayingSelector {
    if (!isSelectionPlaying(selector)) {
        throw new Error('TargetSelector: selection is not PlayCardSelection');
    }
}

export function newTargetSelector(request: RequestStatusUnion = {}): TargetSelector {
    return {
        request,
        prompt: { type: 'none' },
        selection: { mode: 'start' },
    };
}

export function getCurrentCardAndTargets(selector: PlayingSelector): [KnownCard, CardTarget[]] {
    switch (selector.selection.mode) {
    case 'target':
        return [selector.selection.playing_card!, selector.selection.targets];
    case 'modifier': {
        const pair = selector.selection.modifiers.at(-1)!;
        return [pair.modifier, pair.targets];
    }
    default:
        throw new Error('TargetSelector: not in targeting mode');
    }
}

export function selectorCanConfirm(table: GameTable): boolean {
    const selector = table.selector;
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier': {
        const [currentCard, targets] = getCurrentCardAndTargets(selector as PlayingSelector);
        const [effects, optionals] = getCardEffects(currentCard, isResponse(selector));
        const index = getNextTargetIndex(targets);
        if (index < targets.length) {
            const lastTarget = targets.at(-1);
            if (lastTarget !== undefined) {
                const lastTargetValue = Object.values(lastTarget)[0];
                if (Array.isArray(lastTargetValue) && !lastTargetValue.every(id => id === 0)) {
                    return false;
                }
            }
        }
        
        return optionals.length !== 0
            && index >= effects.length
            && (index - effects.length) % optionals.length === 0;
    }
    default:
        return false;
    }
}

export function isAutoSelect(table: GameTable): boolean {
    const selector = table.selector;
    return isResponse(selector)
        && selector.request.respond_cards.length === 1 && selector.request.pick_cards.length === 0
        && cardHasTag(getCard(table, selector.request.respond_cards[0].card), 'auto_select');
}

export function getAutoSelectCard(table: GameTable): CardId | undefined {
    const selector = table.selector;
    if (selector.selection.mode === 'start') {
        if (isSelectionPlaying(selector)) {
            const context = selector.selection.context;
            return context.repeat_card || context.traincost;
        } else if (isAutoSelect(table)) {
            return (selector as RequestSelector).request.respond_cards[0].card;
        }
    }
}

export function selectorCanUndo(table: GameTable): boolean {
    const selector = table.selector;
    if (selector.selection.mode === 'finish') return false;
    if (selector.selection.mode === 'start') {
        return isSelectionPlaying(selector) && !selector.selection.playing_card;
    }
    if (isAutoSelect(table)) {
        const someTargetNotNone = (targets: CardTarget[]) => {
            return targets.some(target => {
                const value = Object.values(target)[0];
                if (Array.isArray(value) && value.every(num => num === 0)) return false;
                if (typeof value === 'object' && Object.keys(value).length === 0) return false;
                return true;
            });
        };
        if (selector.selection.mode === 'target') {
            return someTargetNotNone(selector.selection.targets);
        } else if (selector.selection.mode === 'modifier') {
            return selector.selection.modifiers.length !== 1 || someTargetNotNone(selector.selection.modifiers[0].targets);
        }
    }
    return true;
}

export function getPlayableCards(selector: TargetSelector): CardId[] {
    let tree: CardNode[] = [];
    if (isResponse(selector)) {
        tree = selector.request.respond_cards;
    } else if (isStatusReady(selector)) {
        tree = selector.request.play_cards;
    }
    if (isSelectionPlaying(selector)) {
        if (selector.selection.playing_card !== null) {
            return [];
        }
        tree = selector.selection.modifiers.reduce((tree: CardNode[], { modifier }) => {
            return tree.find(leaf => leaf.card === modifier.id)!.branches;
        }, tree);
    }
    return tree.map(node => node.card);
}

export function selectorCanPlayCard(selector: TargetSelector, card: Card): card is KnownCard {
    return !isCardCurrent(selector, card)
        && !isCardSelected(selector, card.id)
        && isCardKnown(card)
        && getPlayableCards(selector).includes(card.id);
}

export function selectorCanPickCard(table: GameTable, card: Card): boolean {
    const selector = table.selector;
    if (isResponse(selector)) {
        switch (card.pocket?.name) {
            case 'main_deck':
            case 'discard_pile':
                return selector.request.pick_cards.some(pickCard => getCard(table, pickCard).pocket?.name === card.pocket?.name);
            default:
                return selector.request.pick_cards.includes(card.id);
        }
    }
    return false;
}

export function isCardCurrent(selector: TargetSelector, card: Card): card is KnownCard {
    return isSelectionPlaying(selector)
        && (selector.selection.playing_card?.id === card.id
        || selector.selection.modifiers.some(({modifier}) => modifier.id === card.id));
}

export function isCardPrompted(selector: TargetSelector, card: Card): card is KnownCard {
    return selector.prompt.type === 'playpick' && selector.prompt.card.id === card.id;
}

export function isCardSelected(selector: TargetSelector, card: CardId): boolean {
    const check = (target: CardTarget) => {
        if ('card' in target) {
            return target.card === card;
        }
        if ('extra_card' in target) {
            return target.extra_card === card;
        }
        if ('cards' in target) {
            return target.cards.includes(card);
        }
        if ('cards_other_players' in target) {
            return target.cards_other_players.includes(card);
        }
        return false;
    };
    if (isSelectionPlaying(selector)) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function isHandSelected(table: GameTable, card: Card): boolean {
    const selector = table.selector;
    if (card.pocket?.name === 'player_hand' && card.pocket.player !== table.self_player && isSelectionPlaying(selector)) {
        const player = getPlayer(table, card.pocket.player);
        return player.pockets.player_hand.some(id => isCardSelected(selector, id));
    } else {
        return false;
    }
}

export function isPlayerSelected(selector: TargetSelector, player: Player): boolean {
    const check = (target: CardTarget) => {
        if ('player' in target) {
            return target.player === player.id;
        }
        if ('conditional_player' in target) {
            return target.conditional_player === player.id;
        }
        if ('adjacent_players' in target) {
            return target.adjacent_players.includes(player.id);
        }
        return false;
    };
    if (isSelectionPlaying(selector)) {
        if (selector.selection.targets.some(check)) {
            return true;
        }
        if (selector.selection.modifiers.some(({targets}) => targets.some(check))) {
            return true;
        }
    }
    return false;
}

export function countSelectedCubes(selector: TargetSelector, targetCard: Card): number {
    let selected = 0;
    const response = isResponse(selector);
    const doCount = (card: KnownCard, targets: CardTarget[]) => {
        for (const [target, effect] of zipCardTargets(targets, getCardEffects(card, response))) {
            if ('select_cubes' in target) {
                selected += count(target.select_cubes, targetCard.id);
            } else if ('self_cubes' in target && targetCard.id === card.id) {
                selected += effect.target_value;
            }
        }
    };
    if (isSelectionPlaying(selector)) {
        if (selector.selection.playing_card) {
            doCount(selector.selection.playing_card, selector.selection.targets);
        }
        for (const {modifier, targets} of selector.selection.modifiers) {
            doCount(modifier, targets);
        }
    }
    return selected;
}

export function isValidCubeTarget(table: PlayingSelectorTable, card: Card): boolean {
    const selector = table.selector;
    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);
    
    return nextTarget?.target === 'select_cubes'
        && player === table.self_player
        && card.num_cubes > countSelectedCubes(selector, card);
}

export function isValidCardTarget(table: PlayingSelectorTable, card: Card): boolean {
    switch (card.pocket?.name) {
    case 'player_character':
    case 'player_table':
    case 'player_hand':
    case 'selection':
        break;
    default:
        return false;
    }

    const player = card.pocket && 'player' in card.pocket ? card.pocket.player : undefined;

    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (nextTarget?.target) {
    case 'card':
    case 'extra_card':
    case 'cards':
        if (player && !checkPlayerFilter(table, nextTarget.player_filter, getPlayer(table, player))) {
            return false;
        }
        if (!checkCardFilter(table, nextTarget.card_filter, card)) {
            return false;
        }
        return true;
    case 'cards_other_players': {
        if (getCardColor(card) === 'black' || card.cardData.deck === 'character') {
            return false;
        }
        if (!player || player === table.self_player || player === selector.selection.context.skipped_player) {
            return false;
        }
        const lastTarget = selector.selection.targets.at(index);
        if (lastTarget && 'cards_other_players' in lastTarget) {
            if (lastTarget.cards_other_players.some(targetCard => {
                if (targetCard <= 0) return false;
                const selectedCard = getCard(table, targetCard);
                if (selectedCard.pocket && 'player' in selectedCard.pocket) {
                    return selectedCard.pocket.player === player;
                } else {
                    return false;
                }
            })) {
                return false;
            }
        }
        return true;
    }
    case 'select_cubes':
        return player === table.self_player
            && card.num_cubes > countSelectedCubes(selector, card);
    default:
        return false;
    }
}

export type EffectsAndOptionals = [CardEffect[], CardEffect[]];
export type TargetAndEffect = [CardTarget, CardEffect];

export function getCardEffects(card: KnownCard, isResponse: boolean): EffectsAndOptionals {
    return [isResponse ? card.cardData.responses : card.cardData.effects, card.cardData.optionals];
}

export function *zipCardTargets(targets: CardTarget[], [effects, optionals]: EffectsAndOptionals): Generator<[CardTarget, CardEffect]> {
    let index = 0;
    for (let effect of effects) {
        if (index >= targets.length) return;
        yield [targets[index++], effect];
    }
    while (optionals.length !== 0) {
        for (let effect of optionals) {
            if (index >= targets.length) return;
            yield [targets[index++], effect];
        }
    }
}

export function getNextTargetIndex(targets: CardTarget[]): number {
    if (targets.length !== 0) {
        let lastTarget = Object.values(targets.at(-1)!)[0];
        if (Array.isArray(lastTarget) && lastTarget.includes(0)) {
            return targets.length - 1;
        }
    }
    return targets.length;
}

export function getEffectAt([effects, optionals]: EffectsAndOptionals, index: number): CardEffect | undefined {
    if (index < effects.length) {
        return effects[index];
    } else if (optionals.length !== 0) {
        return optionals[(index - effects.length) % optionals.length];
    }
}

export function isValidPlayerTarget(table: PlayingSelectorTable, player: Player): boolean {
    const selector = table.selector;
    const [currentCard, targets] = getCurrentCardAndTargets(selector);
    const index = getNextTargetIndex(targets);
    const nextTarget = getEffectAt(getCardEffects(currentCard, isResponse(selector)), index);

    switch (nextTarget?.target) {
    case 'player':
    case 'conditional_player':
        return checkPlayerFilter(table, nextTarget.player_filter, player);
    case 'adjacent_players': {
        const checkTargets = (target1: Player, target2: Player) => {
            return checkPlayerFilter(table, ['notself'], target2)
                && calcPlayerDistance(table, target1.id, target2.id) === 1;
        };
        const firstPlayer = (targets[index] as {adjacent_players: PlayerId[]}).adjacent_players[0];
        if (firstPlayer === 0) {
            return checkPlayerFilter(table, ['notself', 'reachable'], player)
                && table.alive_players.some(target2 => checkTargets(player, getPlayer(table, target2)));
        } else {
            return checkTargets(getPlayer(table, firstPlayer), player);
        }
    }
    default:
        return false;
    }
}

export function isValidEquipTarget(table: PlayingSelectorTable, player: Player): boolean {
    const selector = table.selector;
    return selector.selection.playing_card !== null
        && isEquipCard(selector.selection.playing_card)
        && checkPlayerFilter(table, getEquipTarget(selector.selection.playing_card), player);
}