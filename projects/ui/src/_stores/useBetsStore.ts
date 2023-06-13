import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Game, GamesMap, GameBet } from '../_types'

type BetsStore = {
	games: Game[]
	gamesById: GamesMap
	betsByGameId: {
		[key: string]: GameBet
	}
}

type BetsStoreActions = {
	setGames: (games: Game[], gamesById: GamesMap) => void
	betGame: (gameId: string, teamId?: string, amount?: number) => void
}

const useBetsStore = create(
	immer<BetsStore & BetsStoreActions>((set) => ({
		games: [],
		gamesById: {},
		betsByGameId: {},
		setGames: (games, gamesById) =>
			set((state) => {
				state.games = games
				state.gamesById = gamesById
			}),
		betGame: (gameId, teamId, amount = 0) =>
			set((state) => {
				if (typeof teamId === 'undefined') {
					delete state.betsByGameId[gameId]
					return
				}

				state.betsByGameId[gameId] = {
					gameId,
					teamId,
					amount,
				}
			}),
	})),
)

export default useBetsStore
