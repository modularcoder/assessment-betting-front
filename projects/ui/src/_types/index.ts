import { type Game } from '../../../_types'
export { Game }

export type GamesList = Game[]
export type GamesMap = { [key: string]: Game }

export type GameBet = {
	gameId: string
	teamId: string
	amount: number
}
