import { GameStringRegistry } from "../Registry";

export const GAME_STRINGS_ENGLISH: GameStringRegistry = {

    PROMPT_CARD_NO_EFFECT: (card) =>                                            <>Playing {card} would have no effect. Continue?</>,
    PROMPT_PASS_DISCARD: (ncards) =>                                            <>You must discard {ncards === 1 ? "a card" : `${ncards} cards`}. Continue?</>,
    PROMPT_MOVE_BOMB_TO_SELF: (card) =>                                         <>You're keeping {card} on yourself. Continue?</>,
    PROMPT_REPLACE: (card, target_card) =>                                      <>Do you want to play {card} to replace {target_card}?</>,
    PROMPT_TARGET_SELF: (card) =>                                               <>Do you want to play {card} on yourself?</>,
    PROMPT_TARGET_GHOST: (card, player) =>                                      <>{player} is a ghost, playing {card} would have no effect. Continue?</>,
    PROMPT_NO_REDRAW: (card) =>                                                 <>Do you want to play {card} without redrawing the card?</>,
    PROMPT_BANG_STRENGTH: (ncards) =>                                           <>You have to respond with {ncards} Missed! Continue?</>,
    PROMPT_NO_BANGS_PLAYED: (card) =>                                           <>You haven't played any Bang, playing {card} would have no effect. Continue?</>,
    PROMPT_TARGET_SELF_GHOST_CARD: () =>                                        <>You're discarding your own ghost card. Continue?</>,
    PROMPT_WASTEFUL_HEAL: (card, amount, max_amount) =>                         <>Playing {card} to heal by {amount} hp would waste {max_amount} hp. Continue?</>,
    PROMPT_SUICIDE: (card) =>                                                   <>Playing {card} will lead to suicide. Continue?</>,
    PROMPT_DEATH: () =>                                                         <>You can play a beer to save yourself. Continue?</>,
    PROMPT_PLAY_OR_PICK: (card) =>                                              <>{card} : Play or discard this card?</>,
    
    STATUS_GAME_OVER: () =>                                                     <>Game Over</>,
    STATUS_YOUR_TURN: () =>                                                     <>Your turn ... Choose how to draw</>,
    STATUS_YOUR_TURN_OTHER: (player) =>                                         <>{player} must choose how to draw</>,
    STATUS_CHARACTERCHOICE: () =>                                               <>Choose your character</>,
    STATUS_CHARACTERCHOICE_OTHER: (player) =>                                   <>{player} must choose their character</>,
    STATUS_PREDRAW: () =>                                                       <>Choose which card to "Draw!" for</>,
    STATUS_PREDRAW_OTHER: (player) =>                                           <>{player} must choose which card to "draw!" for</>,
    STATUS_CHECK: (card) =>                                                     <>Choose which card to "draw!" for {card}</>,
    STATUS_CHECK_OTHER: (player, card) =>                                       <>{player} must choose which card to "draw!" for {card}</>,
    STATUS_GENERALSTORE: (card) =>                                              <>{card} ... Choose a card</>,
    STATUS_GENERALSTORE_OTHER: (player, card) =>                                <>{card} ... {player} must choose a card</>,
    STATUS_DISCARD: (player) =>                                                 <>{player} ... Discard a card</>,
    STATUS_DISCARD_OTHER: (player, card) =>                                     <>{card} ... {player} must discard a card</>,
    STATUS_DISCARD_PASS: (ncards) =>                                            <>Discard {ncards === 1 ? "a card" : `${ncards} cards`} before passing the turn</>,
    STATUS_DISCARD_PASS_OTHER: (player, ncards) =>                              <>{player} must discard {ncards === 1 ? "a card" : `${ncards} cards`} before passing the turn</>,
    STATUS_BANG: (card, strength, damage) =>                                    <>{card} ... Respond with {strength === 1 ? "Missed" : `${strength} Missed`} or lose {damage === 1 ? "a life point" : `${damage} life points`}</>,
    STATUS_BANG_OTHER: (player, card) =>                                        <>{player} must respond to {card}</>,
    STATUS_CARD_AS_BANG: (card, strength, damage) =>                            <>{card} as Bang! ... Respond {strength === 1 ? "Missed" : `${strength} Missed`} or lose {damage === 1 ? "a life point" : `${damage} life points`}</>,
    STATUS_CARD_AS_BANG_OTHER: (player, card) =>                                <>{player} must respond to {card} as Bang!</>,
    STATUS_CARD_AS_GATLING: (card) =>                                           <>{card} as Gatling ... Respond with Missed or lose a life point</>,
    STATUS_CARD_AS_GATLING_OTHER: (player, card) =>                             <>{player} must respond to {card} as Gatling</>,
    STATUS_INDIANS: (card) =>                                                   <>{card} ... Respond with Bang or lose a life point</>,
    STATUS_INDIANS_OTHER: (player, card) =>                                     <>{player} must respond to {card}</>,
    STATUS_DUEL: (card) =>                                                      <>{card} ... Respond with Bang or lose a life point</>,
    STATUS_DUEL_OTHER: (player, card) =>                                        <>{player} must respond to {card}</>,
    STATUS_DESTROY: (card, target_card) =>                                      <>{card} to discard {target_card}</>,
    STATUS_DESTROY_FROM_HAND: (card) =>                                         <>{card} to discard a card from your hand</>,
    STATUS_DESTROY_OTHER: (target, card, target_card) =>                        <>{card} to discard {target}'s {target_card}</>,
    STATUS_DESTROY_OTHER_FROM_HAND: (player, card) =>                           <>{card} to discard a card from {player}'s hand</>,
    STATUS_STEAL: (card, target_card) =>                                        <>{card} to steal {target_card}</>,
    STATUS_STEAL_FROM_HAND: (card) =>                                           <>{card} to steal a card from your hand</>,
    STATUS_STEAL_OTHER: (player, card, target_card) =>                          <>{card} to steal {player}'s {target_card}</>,
    STATUS_STEAL_OTHER_FROM_HAND: (player, card) =>                             <>{card} to steal a card from {player}'s hand</>,
    STATUS_DEATH: (nbeers) =>                                                   <>You must play {nbeers === 1 ? "a beer" : `${nbeers} beers`} to save yourself</>,
    STATUS_DEATH_OTHER: (player, nbeers) =>                                     <>{player} must play {nbeers === 1 ? "a beer" : `${nbeers} beers`} to escape death</>,
    STATUS_DISCARD_ALL: () =>                                                   <>You are dead! Discard all your cards</>,
    STATUS_DISCARD_ALL_OTHER: (player) =>                                       <>{player} is dead and must discard all their cards</>,
    STATUS_DISCARD_HAND: (card) =>                                              <>{card} ... you must discard your whole hand</>,
    STATUS_DISCARD_HAND_OTHER: (arg0, player) =>                                <>{arg0} ... {player} must discard their whole hand</>,
    STATUS_SHERIFF_KILLED_DEPUTY: () =>                                         <>You killed your deputy! Discard all your cards</>,
    STATUS_SHERIFF_KILLED_DEPUTY_OTH: (player) =>                               <>{player} killed their deputy and must discard all their cards</>,
    STATUS_BANDIDOS: (player) =>                                                <>{player} ... Discard two cards or lose a life point</>,
    STATUS_BANDIDOS_OTHER: (player, arg1) =>                                    <>{player} must respond to {arg1}</>,
    STATUS_BANDIDOS2: (card) =>                                                 <>{card} ... Discard a bang or two cards</>,
    STATUS_BANDIDOS2_OTHER: (player, card) =>                                   <>{player} must respond to {card}</>,
    STATUS_TORNADO: (arg0) =>                                                   <>{arg0} ... Discard a card to draw two</>,
    STATUS_TORNADO_OTHER: (player, arg1) =>                                     <>{arg1} ... {player} must discard a card to draw two</>,
    STATUS_TORNADO2: (arg0) =>                                                  <>{arg0} ... Choose two cards to give to the player on your left</>,
    STATUS_TORNADO2_OTHER: (player, arg1) =>                                    <>{arg1} ... {player} must choose two cards</>,
    STATUS_POKER: (arg0) =>                                                     <>{arg0} ... Discard a card</>,
    STATUS_POKER_OTHER: (player, arg1) =>                                       <>{arg1} ... {player} must discard a card</>,
    STATUS_POKER_DRAW: (arg0) =>                                                <>{arg0} ... Choose which cards to draw</>,
    STATUS_POKER_DRAW_OTHER: (player, arg1) =>                                  <>{arg1} ... {player} must choose which cards to draw</>,
    STATUS_SAVED: (arg0, arg1) =>                                               <>{arg0} ... Choose whether to draw from the deck or from the hand of {arg1}</>,
    STATUS_SAVED_OTHER: (player, arg1, arg2) =>                                 <>{arg1} ... {player} must choose whether to draw from the deck or from the hand of {arg2}</>,
    STATUS_ADD_CUBE: (ncubes) =>                                                <>Choose which card to put {ncubes === 1 ? "a cube" : `${ncubes} cubes`} onto</>,
    STATUS_ADD_CUBE_OTHER: (player, ncubes) =>                                  <>{player} must choose which card to put {ncubes === 1 ? "a cube" : `${ncubes} cubes`} onto</>,
    STATUS_ADD_CUBE_FOR: (card, ncubes) =>                                      <>Choose which card to put {ncubes === 1 ? "a cube" : `${ncubes} cubes`} onto, for {card}</>,
    STATUS_ADD_CUBE_FOR_OTHER: (player, card, ncubes) =>                        <>{player} must choose which card to put {ncubes === 1 ? "a cube" : `${ncubes} cubes`} onto, for {card}</>,
    STATUS_MOVE_BOMB: (arg0) =>                                                 <>Choose which player to move {arg0} onto</>,
    STATUS_MOVE_BOMB_OTHER: (arg0, arg1) =>                                     <>{arg0} must choose which player to move {arg1} onto</>,
    STATUS_RUST: (arg0) =>                                                      <>{arg0} ... give away a cube from all your cards</>,
    STATUS_RUST_OTHER: (arg0, arg1) =>                                          <>{arg1} against {arg0}</>,
    STATUS_RICOCHET: (arg0, target_card) =>                                     <>{arg0} ... Respond with Missed or discard {target_card}</>,
    STATUS_RICOCHET_OTHER: (arg0, arg1, arg2) =>                                <>{arg1} to discard {arg0}'s {arg2}</>,
    STATUS_PEYOTE: (arg0) =>                                                    <>{arg0} ... Declare Red or Black</>,
    STATUS_PEYOTE_OTHER: (arg0, arg1) =>                                        <>{arg1} ... {arg0} must declare Red or Black</>,
    STATUS_HANDCUFFS: (arg0) =>                                                 <>{arg0} ... Declare a suit</>,
    STATUS_HANDCUFFS_OTHER: (arg0, arg1) =>                                     <>{arg1} ... {arg0} must declare a suit</>,
    STATUS_KIT_CARLSON: (arg0) =>                                               <>{arg0} ... Choose which cards to draw</>,
    STATUS_KIT_CARLSON_OTHER: (arg0, arg1) =>                                   <>{arg1} ... {arg0} must choose which cards to draw</>,
    STATUS_CLAUS_THE_SAINT: (arg0) =>                                           <>{arg0} ... Choose the cards to give to the other players</>,
    STATUS_CLAUS_THE_SAINT_OTHER: (arg0, arg1) =>                               <>{arg1} ... {arg0} must choose the cards to give to the other players</>,
    STATUS_VERA_CUSTER: (arg0) =>                                               <>{arg0} ... Choose which character to copy</>,
    STATUS_VERA_CUSTER_OTHER: (arg0, arg1) =>                                   <>{arg1} ... {arg0} must choose which character to copy</>,
    STATUS_YOUL_GRINNER: (arg0, arg1) =>                                        <>{arg0} ... Give {arg1} a card</>,
    STATUS_YOUL_GRINNER_OTHER: (arg0, arg1, arg2) =>                            <>{arg0} ... {arg2} must give {arg1} a card</>,
    STATUS_DUTCH_WILL: (arg0) =>                                                <>{arg0} ... Choose which card to draw</>,
    STATUS_DUTCH_WILL_OTHER: (arg0, arg1) =>                                    <>{arg1} ... {arg0} must choose which card to draw</>,
    STATUS_THEDALTONS: (arg0) =>                                                <>{arg0} ... Discard a blue card</>,
    STATUS_THEDALTONS_OTHER: (arg0) =>                                          <>{arg0} must discard a blue card</>,
    STATUS_CAN_PLAY_CARD: (arg0) =>                                             <>You can play {arg0}</>,
    STATUS_CAN_PLAY_CARD_OTHER: (arg0, arg1) =>                                 <>{arg0} can play {arg1}</>,
    STATUS_DAMAGING: (player, card, damage) =>                                  <>{player} loses {damage === 1 ? "a life point" : `${damage} life points`} for {card}</>,
    STATUS_DAMAGING_AS_BANG: (player, card, damage) =>                          <>{player} loses {damage === 1 ? "a life point" : `${damage} life points`} for {card} as Bang!</>,
    STATUS_DAMAGING_AS_GATLING: (arg0, arg1) =>                                 <>{arg0} loses a life point for {arg1} as Gatling!</>,
    STATUS_REQ_TUMBLEWEED: (arg0, arg1, arg2, arg3) =>                          <>{arg0} "draws!" {arg3} for {arg2} ... You can play {arg1}</>,
    STATUS_REQ_TUMBLEWEED_OTHER: (arg0, arg1, arg2, arg3, arg4) =>              <>{arg0} "draws!" {arg3} for {arg2} ... {arg4} can play {arg1}</>,
    STATUS_REQ_TUMBLEWEED_FOR: (arg0, arg1, arg2) =>                            <>{arg0} "draws!" for {arg2} ... You can play {arg1}</>,
    STATUS_REQ_TUMBLEWEED_FOR_OTHER: (arg0, arg1, arg2, arg3) =>                <>{arg0} "draws!" for {arg2} ... {arg3} can play {arg1}</>,
    STATUS_SWITCH_CARDS: (arg0, arg1, arg2) =>                                  <>{arg0} to switch {arg1} with {arg2}</>,
    STATUS_SWITCH_CARDS_OTHER: (arg0, arg1, arg2, arg3) =>                      <>{arg1} against {arg0} to switch {arg2} with {arg3}</>,
    STATUS_LASTWILL: (arg0) =>                                                  <>You can play {arg0} to give up to three cards to a player</>,
    STATUS_LASTWILL_OTHER: (arg0, arg1) =>                                      <>{arg1} can play {arg0}</>,
    STATUS_EVA_PLACE: (card) =>                                                 <>{card} ... You can reveal the card. If it's diamonds you will draw another</>,
    STATUS_EVA_PLACE_OTHER: (player, card) =>                                   <>{card} ... {player} must choose whether to reveal the card</>,
    STATUS_NEWIDENTITY: (arg0) =>                                               <>{arg0} ... Choose whether to switch character</>,
    STATUS_NEWIDENTITY_OTHER: (arg0, arg1) =>                                   <>{arg1} ... {arg0} must choose whether to switch character</>,
    STATUS_FORCE_PLAY_CARD: (arg0) =>                                           <>You must play {arg0}</>,
    STATUS_FORCE_PLAY_CARD_OTHER: (arg0, arg1) =>                               <>{arg0} must play {arg1}</>,
    STATUS_FORCE_EQUIP_CARD: (arg0) =>                                          <>You must equip {arg0}</>,
    STATUS_FORCE_EQUIP_CARD_OTHER: (arg0, arg1) =>                              <>{arg0} must equip {arg1}</>,
    STATUS_MULTI_VULTURE_SAM: (arg0, arg1) =>                                   <>{arg0} ... choose which card to take from {arg1}</>,
    STATUS_MULTI_VULTURE_SAM_OTHER: (arg0, arg1, arg2) =>                       <>{arg0} ... {arg1} must choose which card to take from {arg2}</>,
    STATUS_RANCH: (arg0) =>                                                     <>{arg0} ... You may discard any number of cards from the hand to draw the same amount</>,
    STATUS_RANCH_OTHER: (arg0, arg1) =>                                         <>{arg0} ... {arg1} may discard any number of cards from the hand to draw the same amount</>,
    STATUS_SGT_BLAZE_LOCOMOTIVE: (arg0) =>                                      <>{arg0} ... You can ignore the effect of the locomotive against a player</>,
    STATUS_SGT_BLAZE_LOCOMOTIVE_OTH: (arg0, arg1) =>                            <>{arg0} ... {arg1} can ignore the effect of the locomotive against a player</>,
    STATUS_CATTLE_TRUCK: (arg0) =>                                              <>{arg0} ... Choose a card to draw</>,
    STATUS_CATTLE_TRUCK_OTHER: (arg0, arg1) =>                                  <>{arg1} ... {arg0} must choose a card to draw</>,
    STATUS_DISCARD_TABLE: (arg0) =>                                             <>{arg0} ... Discard a card in play</>,
    STATUS_DISCARD_TABLE_OTHER: (arg0, arg1) =>                                 <>{arg1} ... {arg0} must discard a card in play</>,
    STATUS_LOUNGE_CAR: (arg0) =>                                                <>{arg0} ... Give one of the railcars drawn to another player</>,
    STATUS_LOUNGE_CAR_OTHER: (arg0, arg1) =>                                    <>{arg1} ... {arg0} must give one of the railcars drawn to another player</>,
    STATUS_MAIL_CAR: (arg0) =>                                                  <>{arg0} ... Give one of the cards drawn to another player</>,
    STATUS_MAIL_CAR_OTHER: (arg0, arg1) =>                                      <>{arg1} ... {arg0} must give one of the cards drawn to another player</>,
    STATUS_MAP: (card) =>                                                       <>{card} ... You can choose one of the cards and discard the other</>,
    STATUS_MAP_OTHER: (arg0, arg1) =>                                           <>{arg1} ... {arg0} can discard one of the cards</>,
    STATUS_MOST_WANTED: (arg0) =>                                               <>{arg0} ... "draw": if spades, lose a life point</>,
    STATUS_MOST_WANTED_OTHER: (arg0, arg1) =>                                   <>{arg1} against {arg0}</>,
    STATUS_TRAIN_ROBBERY: (arg0) =>                                             <>{arg0} ... choose, for each card, between discarding it or receiving a Bang</>,
    STATUS_TRAIN_ROBBERY_OTHER: (arg0, arg1) =>                                 <>{arg1} ... {arg0} must choose between discarding a card or receiving a Bang</>,
    STATUS_KIT_CARLSON_LEGEND: (card) =>                                        <>{card} ... You can give one of the cards drawn to another player</>,
    STATUS_KIT_CARLSON_LEGEND_OTHER: (player, card) =>                          <>{card} ... {player} can give one of the cards drawn to another player</>,
    
    ERROR_INVALID_ACTION: () =>                                                 <>Invalid action</>,
    ERROR_TIMER_EXPIRED: () =>                                                  <>Timer has expired</>,
    ERROR_NOT_ENOUGH_GOLD: () =>                                                <>Not enough gold nuggets</>,
    ERROR_NOT_ENOUGH_CUBES: () =>                                               <>Not enough cubes</>,
    ERROR_NOT_ENOUGH_CUBES_ON: (card) =>                                        <>Not enough cubes on {card}</>,
    ERROR_CARD_HAS_FULL_CUBES: (card) =>                                        <>{card} already has 4 cubes</>,
    ERROR_INVALID_TARGETS: () =>                                                <>Invalid targets</>,
    ERROR_PLAYER_MUST_DRAW: () =>                                               <>You must draw</>,
    ERROR_PLAYER_MUST_NOT_DRAW: () =>                                           <>You must not draw now</>,
    ERROR_CANT_DISCARD_OWN_BLACK: () =>                                         <>You can't discard your own black cards</>,
    ERROR_CARD_DISABLED_BY: (arg0, arg1) =>                                     <>{arg0} is disabled by {arg1}</>,
    ERROR_INVALID_SUIT: (arg0, arg1) =>                                         <>You can't play {arg1}: invalid suit for {arg0}</>,
    ERROR_CARD_INACTIVE: (card) =>                                              <>{card} is inactive in this turn</>,
    ERROR_CANT_EQUIP_CARDS: () =>                                               <>You can't equip cards</>,
    ERROR_DUPLICATED_CARD: (card) =>                                            <>Duplicated card: {card}</>,
    ERROR_TARGET_PLAYING_CARD: () =>                                            <>You can't target the same card you're playing</>,
    ERROR_TARGET_NOT_PLAYER: () =>                                              <>Target is not a player</>,
    ERROR_TARGET_NOT_DEAD: (origin_card, target) =>                             <>You can't play {origin_card} against an alive player ({target})</>,
    ERROR_TARGET_DEAD: (origin_card, target) =>                                 <>You can't play {origin_card} against a dead player ({target})</>,
    ERROR_TARGET_SHERIFF: (origin_card, target) =>                              <>You can't play {origin_card} against the sheriff ({target})</>,
    ERROR_TARGET_NOT_SELF: (origin_card) =>                                     <>You can play {origin_card} only on yourself</>,
    ERROR_TARGET_SELF: (origin_card) =>                                         <>You can't play {origin_card} on yourself</>,
    ERROR_TARGET_ORIGIN: (origin_card) =>                                       <>You can't play {origin_card} against your attacker</>,
    ERROR_TARGET_EMPTY_HAND: (origin_card, target) =>                           <>You can't play {origin_card} against a player with an empty hand ({target})</>,
    ERROR_TARGET_EMPTY_TABLE: (origin_card, target) =>                          <>You can't play {origin_card} against a player with no cards in play ({target})</>,
    ERROR_TARGET_EMPTY_CUBES: (origin_card, target) =>                          <>You can't play {origin_card} against a player with no cubes ({target})</>,
    ERROR_TARGET_NOT_IN_TARGET_SET: (origin_card, target) =>                    <>You can't play {origin_card} against {target}: invalid target</>,
    ERROR_TARGET_NOT_IN_RANGE: (origin_card, target) =>                         <>You can't play {origin_card} against {target}: target out of range</>,
    ERROR_TARGETS_NOT_UNIQUE: () =>                                             <>Targets are not unique</>,
    ERROR_TARGETS_NOT_ADJACENT: () =>                                           <>Targets are not adjacent</>,
    ERROR_TARGET_NOT_CARD: () =>                                                <>This card is not targetable</>,
    ERROR_TARGET_BLACK_CARD: () =>                                              <>You can't target black cards</>,
    ERROR_TARGET_NOT_SELECTION: () =>                                           <>You can only target selection cards</>,
    ERROR_TARGET_NOT_TABLE_CARD: () =>                                          <>You can only target cards in play</>,
    ERROR_TARGET_NOT_HAND_CARD: () =>                                           <>You can only target cards from the hand</>,
    ERROR_TARGET_NOT_BLUE_CARD: () =>                                           <>You can only target blue cards</>,
    ERROR_TARGET_NOT_TRAIN: () =>                                               <>You can only target railcars</>,
    ERROR_TARGET_TRAIN: () =>                                                   <>You can't target railcars</>,
    ERROR_TARGET_NOT_BLUE_OR_TRAIN: () =>                                       <>You can only target blue cards or railcars</>,
    ERROR_TARGET_NOT_HEARTS: () =>                                              <>You can only target hearts cards</>,
    ERROR_TARGET_NOT_DIAMONDS: () =>                                            <>You can only target diamonds cards</>,
    ERROR_TARGET_NOT_CLUBS: () =>                                               <>You can only target clubs cards</>,
    ERROR_TARGET_NOT_SPADES: () =>                                              <>You can only target spades cards</>,
    ERROR_NO_ORIGIN_CARD_SUIT: () =>                                            <>Invalid card suit</>,
    ERROR_TARGET_NOT_TWO_TO_NINE: () =>                                         <>You can only target cards ranked 2 to 9</>,
    ERROR_TARGET_NOT_TEN_TO_ACE: () =>                                          <>You can only target cards ranked 10 to A</>,
    ERROR_TARGET_NOT_BANG: () =>                                                <>You can only target Bang! cards</>,
    ERROR_TARGET_NOT_MISSED: () =>                                              <>You can only target Missed! cards</>,
    ERROR_TARGET_NOT_BEER: () =>                                                <>You can only target Beer cards</>,
    ERROR_TARGET_NOT_CATBALOU_PANIC: () =>                                      <>You can only target Cat Balou or Panic! cards</>,
    ERROR_TARGET_NOT_BRONCO: () =>                                              <>You can only target Bronco</>,
    ERROR_TARGET_NOT_CUBE_SLOT: () =>                                           <>This card cannot hold cubes</>,
    ERROR_SCENARIO_AT_PLAY: (card) =>                                           <>{card} is at play</>,
    ERROR_CANT_PLAY_CARD: (card) =>                                             <>You can't play {card}</>,
    ERROR_ONE_BANG_PER_TURN: () =>                                              <>You can only play one Bang card per turn</>,
    ERROR_CANT_SELF_DAMAGE: () =>                                               <>You can't take off the last life point</>,
    ERROR_CANT_HEAL_PAST_FULL_HP: () =>                                         <>You can't heal yourself past the last life point</>,
    ERROR_PLAYER_IS_FULL_HP: (player) =>                                        <>{player} has already all life points</>,
    ERROR_NOT_START_OF_TURN: () =>                                              <>It's not the start of your turn</>,
    ERROR_DISCARD_PILE_EMPTY: () =>                                             <>The discard pile is empty</>,
    ERROR_MAX_USAGES: (arg0, arg1) =>                                           <>You can't play {arg0} more than {arg1} times per turn</>,
    ERROR_MANDATORY_CARD: (card) =>                                             <>Playing {card} is mandatory</>,
    ERROR_TARGET_NOT_UNIQUE: () =>                                              <>Targets must be unique</>,
    ERROR_CANNOT_REPEAT_CARD: (card) =>                                         <>You can't play {card} twice in a row</>,
    ERROR_CANT_PLAY_WHILE_EQUIPPING: (card) =>                                  <>You can't play {card} while equipping a card</>,
    ERROR_NO_RANGED_TARGET: (arg0, arg1) =>                                     <>You can't play {arg0} because {arg1} has no range limit</>,
    ERROR_CANNOT_SKIP_PLAYER: (arg0) =>                                         <>You can't skip the effect against {arg0}</>,
    ERROR_CANNOT_TARGET_PLAYER: (arg0, arg1, arg2) =>                           <>You can't play {arg2} against {arg1} for {arg0}</>,
    ERROR_TRAIN_NOT_IN_ANY_STATION: () =>                                       <>This railcar is not paired to any station</>,
    ERROR_TRAIN_NOT_IN_THIS_STATION: () =>                                      <>This railcar is not paired to this station</>,
    
    LOG_GAME_START: () =>                                                       <>Game started</>,
    LOG_GAME_OVER: () =>                                                        <>Game over</>,
    LOG_DECK_RESHUFFLED: () =>                                                  <>The deck is reshuffled</>,
    LOG_SHOP_RESHUFFLED: () =>                                                  <>The shop deck is reshuffled</>,
    LOG_TURN_START: (arg0) =>                                                   <>It's {arg0}'s turn</>,
    LOG_SOLD_BEER: (arg0, arg1) =>                                              <>{arg0} sells {arg1}</>,
    LOG_DISCARDED_CARD: (arg0, arg1, arg2) =>                                   <>{arg0} forces {arg1} to discard {arg2}</>,
    LOG_DISCARDED_SELF_CARD: (arg0, arg1) =>                                    <>{arg0} discards {arg1}</>,
    LOG_DISCARDED_A_CARD_FOR: (arg0, arg1) =>                                   <>{arg1} discards a card for {arg0}</>,
    LOG_DISCARDED_CARD_FOR: (arg0, arg1, arg2) =>                               <>{arg1} discards {arg2} for {arg0}</>,
    LOG_DISCARDED_ORANGE_CARD: (arg0, arg1) =>                                  <>{arg0} must discard {arg1}</>,
    LOG_STOLEN_CARD: (arg0, arg1, arg2) =>                                      <>{arg0} steals {arg1}'s {arg2}</>,
    LOG_STOLEN_CARD_FROM_HAND: (arg0, arg1) =>                                  <>{arg0} steals a card from {arg1}'s hand</>,
    LOG_STOLEN_SELF_CARD: (arg0, arg1) =>                                       <>{arg0} redraws {arg1}</>,
    LOG_STOLEN_SELF_CARD_FROM_HAND: (arg0, arg1) =>                             <>{arg0} redraws {arg1} from their hand</>,
    LOG_DRAWN_WITH_CHARACTER: (arg0, arg1) =>                                   <>{arg1} draws using {arg0}</>,
    LOG_DRAWN_FROM_GENERALSTORE: (arg0, arg1, arg2) =>                          <>{arg0} draws {arg1} for {arg2}</>,
    LOG_PLAYED_CHARACTER: (arg0, arg1) =>                                       <>{arg1} plays {arg0}'s effect</>,
    LOG_RESPONDED_WITH_CHARACTER: (arg0, arg1) =>                               <>{arg1} responds with {arg0}'s effect</>,
    LOG_PLAYED_CARD: (arg0, arg1) =>                                            <>{arg1} plays {arg0}</>,
    LOG_PLAYED_CARD_ON: (arg0, arg1, arg2) =>                                   <>{arg1} plays {arg0} on {arg2}</>,
    LOG_PLAYED_CARD_STEAL: (arg0, arg1, arg2, arg3) =>                          <>{arg1} plays {arg0} to steal {arg3} from {arg2}</>,
    LOG_PLAYED_CARD_STEAL_HAND: (arg0, arg1, arg2) =>                           <>{arg1} plays {arg0} to steal a card from {arg2}'s hand</>,
    LOG_PLAYED_CARD_STEAL_OWN: (arg0, arg1, arg2) =>                            <>{arg1} plays {arg0} to redraw {arg2}</>,
    LOG_PLAYED_CARD_STEAL_OWN_HAND: (arg0, arg1) =>                             <>{arg1} plays {arg0} to redraw a card from the hand</>,
    LOG_PLAYED_CARD_DESTROY: (arg0, arg1, arg2, arg3) =>                        <>{arg1} plays {arg0} to discard {arg3} from {arg2}</>,
    LOG_PLAYED_CARD_DESTROY_HAND: (arg0, arg1, arg2) =>                         <>{arg1} plays {arg0} to discard a card from {arg2}'s hand</>,
    LOG_PLAYED_CARD_DESTROY_OWN: (arg0, arg1, arg2) =>                          <>{arg1} plays {arg0} to discard {arg2}</>,
    LOG_PLAYED_CARD_AS_BANG_ON: (arg0, arg1, arg2) =>                           <>{arg1} plays {arg0} as Bang! on {arg2}</>,
    LOG_PLAYED_CARD_AS_GATLING: (arg0, arg1) =>                                 <>{arg1} plays {arg0} as Gatling</>,
    LOG_PLAYED_CARD_AS_MISSED: (card, player) =>                                <>{player} plays {card} as Missed!</>,
    LOG_PLAYED_TABLE_CARD: (arg0, arg1) =>                                      <>{arg1} plays {arg0} from the table</>,
    LOG_EQUIPPED_CARD: (arg0, arg1) =>                                          <>{arg1} equips {arg0}</>,
    LOG_EQUIPPED_CARD_TO: (arg0, arg1, arg2) =>                                 <>{arg1} equips {arg0} on {arg2}</>,
    LOG_BOUGHT_CARD: (arg0, arg1) =>                                            <>{arg1} buys and plays {arg0}</>,
    LOG_BOUGHT_EQUIP: (arg0, arg1) =>                                           <>{arg1} buys and equips {arg0}</>,
    LOG_BOUGHT_EQUIP_TO: (arg0, arg1, arg2) =>                                  <>{arg1} buys and equips {arg0} to {arg2}</>,
    LOG_CHOSE_CARD: (arg0, arg1) =>                                             <>{arg1} chose {arg1}</>,
    LOG_RESPONDED_WITH_CARD: (arg0, arg1) =>                                    <>{arg1} responds with {arg0}</>,
    LOG_RESPONDED_WITH_CARD_AS_MISSED: (arg0, arg1) =>                          <>{arg1} responds with {arg0} as Missed!</>,
    LOG_DRAWN_FROM_DECK: (arg0) =>                                              <>{arg0} draws from the deck</>,
    LOG_DRAWN_CARD: (arg0, arg1) =>                                             <>{arg0} draws {arg1}</>,
    LOG_DRAWN_CARDS: (player, ncards) =>                                        <>{player} draws {ncards === 1 ? "a card" : `${ncards} cards`}</>,
    LOG_DRAWN_CARD_FOR: (arg0, arg1, arg2) =>                                   <>{arg0} draws {arg1} for {arg2}</>,
    LOG_DRAWN_CARDS_FOR: (player, ncards, card) =>                              <>{player} draws {ncards === 1 ? "a card" : `${ncards}`} for {card}</>,
    LOG_DRAWN_FROM_DISCARD: (arg0, arg1) =>                                     <>{arg0} draws {arg1} from the top of the discard pile</>,
    LOG_REVEALED_CARD: (arg0, arg1) =>                                          <>{arg0} reveals {arg1}</>,
    LOG_CHECK_DREW_CARD: (arg0, arg1, arg2) =>                                  <>{arg1} "draws!" {arg2} for {arg0}</>,
    LOG_TAKEN_DAMAGE: (card, player, damage) =>                                 <>{player} loses {damage === 1 ? "a life point" : `${damage} life points`} for {card}</>,
    LOG_TAKEN_DAMAGE_AS_BANG: (card, player, damage) =>                         <>{player} loses {damage === 1 ? "a life point" : `${damage} life points`} for {card} as Bang!</>,
    LOG_TAKEN_DAMAGE_AS_GATLING: (arg0, arg1) =>                                <>{arg1} loses a life point for {arg0} as Gatling</>,
    LOG_HEALED: (player, amount) =>                                             <>{player} heals for {amount === 1 ? "1 life point" : `${amount} life points`}</>,
    LOG_PLAYER_KILLED: (arg0, arg1) =>                                          <>{arg0} killed {arg1}</>,
    LOG_PLAYER_DIED: (arg0) =>                                                  <>{arg0} died</>,
    LOG_JAIL_BREAK: (player) =>                                                 <>{player} breaks from jail</>,
    LOG_SKIP_TURN: (player) =>                                                  <>{player} skips the turn</>,
    LOG_CARD_EXPLODES: (card) =>                                                <>{card} explodes!</>,
    LOG_CARD_HAS_EFFECT: (card) =>                                              <>{card}'s effect is activated</>,
    LOG_CHARACTER_CHOICE: (arg0, arg1) =>                                       <>{arg0} has {arg1} as character</>,
    LOG_DRAWN_SHOP_CARD: (card) =>                                              <>{card} gets revealed from the shop</>,
    LOG_KILLED_OUTLAW: (player) =>                                              <>{player} killed an outlaw!</>,
    LOG_SHERIFF_KILLED_DEPUTY: (player) =>                                      <>{player} killed the deputy!</>,
    LOG_MOVE_BOMB_ON: (arg0, arg1, arg2) =>                                     <>{arg1} moves {arg0} on {arg2}</>,
    LOG_MOVED_CUBE: (player, origin, target, ncubes) =>                         <>{player} moves {ncubes === 1 ? "a cube" : `${ncubes} cubes`} from {origin} to {target}</>,
    LOG_MOVED_CUBE_FROM: (player, target, card, target_card, ncubes) =>         <>{player} moves {ncubes === 1 ? "a cube" : `${ncubes} cubes`} from {target}'s {card} to {target_card}</>,
    LOG_PAID_CUBE: (player, card, ncubes) =>                                    <>{player} pays {ncubes === 1 ? "a cube" : `${ncubes} cubes`} from {card}</>,
    LOG_DROP_CUBE: (player, card, ncubes) =>                                    <>{player} drops {ncubes === 1 ? "a cube" : `${ncubes} cubes`} from {card}</>,
    LOG_ADD_CUBE: (player, card, ncubes) =>                                     <>{player} adds {ncubes === 1 ? "a cube" : `${ncubes} cubes`} on {card}</>,
    LOG_GIFTED_CARD: (arg0, arg1, arg2) =>                                      <>{arg0} gives {arg2} to {arg1}</>,
    LOG_GIFTED_A_CARD: (arg0, arg1) =>                                          <>{arg0} gives {arg1} a card</>,
    LOG_COPY_CHARACTER: (arg0, arg1) =>                                         <>{arg0} copies the effect of {arg1}</>,
    LOG_DRAWN_SCENARIO_CARD: (card) =>                                          <>{card} is active</>,
    LOG_RECEIVED_N_BANGS_FOR: (arg0, arg1, arg2) =>                             <>{arg0} receives {arg2 === 1 ? "a Bang" : `${arg2} Bangs`} for {arg1}</>,
    LOG_MANDATORY_CARD: (arg0, arg1) =>                                         <>{arg0} must play {arg1} in phase two</>,
    LOG_POKER_REVEAL: (arg0, arg1) =>                                           <>{arg1} is revealed for {arg0}</>,
    LOG_POKER_ACE: () =>                                                        <>There is an ace, all cards are discarded</>,
    LOG_REVIVE: (arg0, arg1) =>                                                 <>{arg0} revives for {arg1}</>,
    LOG_SWAP_CARDS: (arg0, arg1, arg2, arg3) =>                                 <>{arg0} swaps {arg2} with {arg1}'s {arg3}</>,
    LOG_PLAYER_IMMUNE_TO_CARD: (arg0, arg1, arg2) =>                            <>{arg0} is immune to {arg1} for {arg2}</>,
    LOG_DEFLECTED_BANG_TO: (arg0, arg1, arg2, arg3) =>                          <>{arg1} uses {arg0} to deflect {arg2} to {arg3}</>,
    LOG_TRAIN_ADVANCE: () =>                                                    <>The train advances</>,
    LOG_PAID_FOR_STATION: (arg0, arg1) =>                                       <>{arg1} pays the price for station {arg0}</>,
    LOG_END_OF_LINE: () =>                                                      <>End of the line! The effect of the locomotive is activated</>,
    LOG_SKIP_PLAYER: (card, player, target, target_card) =>                     <>{player} uses {card} to exempt {target} from the effect of {target_card}</>,
    LOG_SKIP_PLAYER_LOCOMOTIVE: (card, player, target) =>                       <>{player} uses {card} to exempt {target} from the effect of the locomotive</>,

};