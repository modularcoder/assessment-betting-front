import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Game, GamesMap } from '../_types'

type BetsStore = {
	games: Game[]
	gamesById: GamesMap
	betsByGameId: {
		[key: string]:
			| {
					amount?: number
					teamId?: string
			  }
			| undefined
	}
}

type BetsStoreActions = {
	setGames: (games: Game[], gamesById: GamesMap) => void
	betGame: (gameId: string, teamId?: string, amount?: number) => void
}

const useBetsStore = create(
	immer<BetsStore & BetsStoreActions>((set, get) => ({
		games: [],
		gamesById: {},
		betsByGameId: {},
		setGames: (games: Game[], gamesById: GamesMap) =>
			set((state) => {
				state.games = games
				state.gamesById = gamesById
			}),
		betGame: (gameId: string, teamId?: string, amount?: number) =>
			set((state) => {
				state.betsByGameId[gameId] = {
					teamId,
					amount,
				}
			}),
	})),
)

// const useBetsStore = create<BetsStore>()(
// 	devtools(
// 		persist(
// 			(set) => ({
// 				bears: 0,
// 				increase: (by) => set((state) => ({ bears: state.bears + by })),
// 			}),
// 			{
// 				name: 'bear-storage',
// 			},
// 		),
// 	),
// )

export default useBetsStore
