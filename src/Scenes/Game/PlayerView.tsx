import { CSSProperties, RefObject, forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { useMapRef } from "../../Utils/LazyRef";
import { Rect, getDivRect } from "../../Utils/Rect";
import LobbyUser, { UserValue } from "../Lobby/LobbyUser";
import { GameTableContext, TargetSelectorContext } from "./GameScene";
import { PocketType } from "./Model/CardEnums";
import { Card, GameTable, Player } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import { PlayingSelector, TargetSelector, isPlayerSelected, isResponse, isValidEquipTarget, isValidPlayerTarget } from "./Model/TargetSelector";
import CharacterView from "./Pockets/CharacterView";
import StackPocket from "./Pockets/StackPocket";
import PocketView, { PocketPosition } from "./Pockets/PocketView";
import ScenarioDeckView from "./Pockets/ScenarioDeckView";
import RoleView from "./RoleView";
import "./Style/PlayerAnimations.css";
import "./Style/PlayerView.css";
import { PocketPositionMap } from "./Animations/CardTracker";

export interface PlayerProps {
    user?: UserValue,
    player: Player,
    onClickCard: (card: Card) => void;
    onClickPlayer: () => void;
}

function getSelectorPlayerClass(table: GameTable, selector: TargetSelector, player: Player) {
    if (isPlayerSelected(selector, player)) {
        return 'player-selected';
    }
    switch (selector.selection.mode) {
    case 'target':
    case 'modifier':
        if (isValidPlayerTarget(table, selector as PlayingSelector, player)) {
            return 'player-targetable';
        }
        break;
    case 'equip':
        if (isValidEquipTarget(table, selector as PlayingSelector, player)) {
            return 'player-targetable';
        }
        break;
    }
    return null;
}

function clampCardRect(cardRect: Rect, pocketRect: Rect | undefined): Rect {
    if (pocketRect) {
        const pocketLeft = pocketRect.x;
        const pocketRight = pocketRect.x + pocketRect.w;
        if (pocketLeft < pocketRight) {
            if (cardRect.x < pocketLeft) {
                return { ...cardRect, x: pocketLeft };
            } else if (cardRect.x + cardRect.w > pocketRight) {
                return { ...cardRect, x: pocketRight - cardRect.w };
            }
        }
    }
    return cardRect;
}

function clampedPocket(pocket: PocketPosition, scrollRef: RefObject<HTMLDivElement>): PocketPosition {
    const getScrollRect = () => {
        if (scrollRef.current) return getDivRect(scrollRef.current);
    };
    return {
        getPocketRect: getScrollRect,
        getCardRect: (card: CardId) => {
            const cardRect = pocket.getCardRect(card);
            if (cardRect) {
                return clampCardRect(cardRect, getScrollRect());
            }
        },
        scrollToEnd: pocket.scrollToEnd
    };
}

const PlayerView = forwardRef<PocketPositionMap, PlayerProps>(({ user, player, onClickCard, onClickPlayer }, ref) => {
    const table = useContext(GameTableContext);
    const selector = useContext(TargetSelectorContext);
    const positions = useMapRef<PocketType, PocketPosition>();
    const handRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => positions);

    const setPos = (pocket: PocketType) => {
        return (value: PocketPosition | null) => {
            positions.set(pocket, value);
        };
    };

    const setScrollPositions = (scrollRef: RefObject<HTMLDivElement>, key: PocketType) => {
        return (pocket: PocketPosition | null) => {
            positions.set(key, pocket ? clampedPocket(pocket, scrollRef) : null);
        }
    };

    const isGameOver = table.status.flags.includes('game_over');
    const isTurn = player.id == table.status.current_turn;

    const selectorPlayerClass = useMemo(() => getSelectorPlayerClass(table, selector, player), [selector]);

    let classes = ['player-view'];
    if (isTurn) {
        classes.push('current-turn');
    }

    const isOrigin = isResponse(selector) && selector.request.origin == player.id;
    const isTarget = isResponse(selector) && selector.request.target == player.id;
    const isWinner = player.status.flags.includes('winner');

    let flipDuration: number | undefined;
    let playerRole = player.status.role;

    let playerStyle = {
        '--player-hp': player.status.hp
    } as CSSProperties;
    
    if (player.animation) {
        if ('flipping_role' in player.animation) {
            flipDuration = player.animation.flipping_role.duration;
            if (player.status.role == 'unknown') {
                playerRole = player.animation.flipping_role.role;
            }
        } else if ('player_hp' in player.animation) {
            playerStyle = {
                ...playerStyle,
                '--player-hp-diff': player.status.hp - player.animation.player_hp.hp,
                '--duration': player.animation.player_hp.duration + 'ms'
            } as CSSProperties;
            classes.push('player-animation-hp');
        }
    } else if (selectorPlayerClass) {
        classes.push(selectorPlayerClass);
    }

    const characterView = (
        <CharacterView ref={ref => {
            positions.set('player_character', ref?.characterRef.current ?? null);
            positions.set('player_backup', ref?.backupRef.current ?? null);
        }} player={player} onClickCard={onClickCard} />
    );

    const roleView = (
        <div className='card-size'>
            <RoleView flipDuration={flipDuration} role={playerRole} />
        </div>
    );

    const scenarioDecks = (<>
        <ScenarioDeckView ref={setPos('scenario_deck')} pocket='scenario_deck' player={player.id} />
        <ScenarioDeckView ref={setPos('wws_scenario_deck')} pocket='wws_scenario_deck' player={player.id} />
    </>);

    const playerIcons = (
        <div className='player-icons'>
            { isGameOver ? <>
                { isWinner ? <div className="player-icon icon-winner"/> : null }
            </> : <>
                { isOrigin ? <div className="player-icon icon-origin"/> : null }
                { isTarget ? <div className="player-icon icon-target"/> : null }
                { isTurn ? <div className="player-icon icon-turn"/> : null }
            </>}
        </div>);

    if (player.id == table.self_player) {
        return <div className={classes.concat('player-view-self').join(' ')} style={playerStyle} onClick={onClickPlayer}>
            <div className="flex-grow">
                <div className='player-pocket-scroll' ref={handRef}>
                    <PocketView ref={setScrollPositions(handRef, 'player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                </div>
                <div className='player-pocket-scroll' ref={tableRef}>
                    <PocketView ref={setScrollPositions(tableRef, 'player_table')} cards={player.pockets.player_table} onClickCard={onClickCard} />
                </div>
            </div>
            <div className='flex flex-row items-end relative'>
                <div className='player-propic-self'><LobbyUser user={user} align='vertical' /></div>
                { characterView } { roleView } { scenarioDecks } { playerIcons } 
            </div>
        </div>
    } else {
        return <div className={classes.join(' ')} style={playerStyle} onClick={onClickPlayer}>
            <div className='player-top-row'>
                { characterView } { roleView }
                <StackPocket showCount slice={0} ref={setPos('player_hand')} cards={player.pockets.player_hand} onClickCard={onClickCard} />
                { scenarioDecks }
                <div className='player-propic'><LobbyUser user={user} align='horizontal' /></div>
                {playerIcons}
            </div>
            <div className='player-pocket-scroll' ref={tableRef}>
                <PocketView ref={setScrollPositions(tableRef, 'player_table')} cards={player.pockets.player_table} onClickCard={onClickCard} />
            </div>
        </div>
    }
});

export default PlayerView;