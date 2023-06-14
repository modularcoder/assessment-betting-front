import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Game, GamesMap, GameBet } from '../_types'

type BetsStore = {
	games: Game[]
	gamesById: GamesMap
	bets: GameBet[]
	betsByGameId: {
		[key: string]: GameBet
	}
}

type BetsStoreActions = {
	setGames: (games: Game[], gamesById: GamesMap) => void
	updateGames: (gamesById: GamesMap) => void
	betGame: (gameId: string, teamId?: string, amount?: number) => void
}

const useBetsStore = create(
	immer<BetsStore & BetsStoreActions>((set) => ({
		games: [],
		gamesById: {},
		bets: [],
		betsByGameId: {},
		setGames: (games, gamesById) =>
			set((state) => {
				state.games = games
				state.gamesById = gamesById
			}),
		updateGames: (gamesById) =>
			set((state) => {
				Object.keys(gamesById).forEach((gameId) => {
					state.gamesById[gameId] = gamesById[gameId]
				})
			}),
		betGame: (gameId, teamId, amount = 0) =>
			set((state) => {
				const prevBetIndex = state.bets.findIndex(
					(bet) => bet.gameId === gameId,
				)

				if (typeof teamId === 'undefined') {
					state.bets.splice(prevBetIndex, 1)
					delete state.betsByGameId[gameId]
					return
				}

				const bet = {
					gameId,
					teamId,
					amount,
				}

				if (prevBetIndex === -1) {
					state.bets.push(bet)
				} else {
					state.bets[prevBetIndex] = bet
				}

				state.betsByGameId[gameId] = bet
			}),
	})),
)

export default useBetsStore
