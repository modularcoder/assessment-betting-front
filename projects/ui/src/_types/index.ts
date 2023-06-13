import { type Game } from '../../../_types'
export { Game }
// export { type Game } from '../../../_types'

// export type GameMap = {
// 	[key: Game['id']]: Game
// }

export type GamesMap = { [key: string]: Game }

export type GameBet = {
	gameId: string
	teamId: string
	amount: number
}
