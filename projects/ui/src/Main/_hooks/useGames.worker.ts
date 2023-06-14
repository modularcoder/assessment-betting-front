import { Game, GamesMap } from '../../_types'

// This should come from .env
const API_URL = 'http://127.0.0.1:8080/games'
const WS_URL = 'ws://127.0.0.1:8080/games'

const games: Game[] = []
const gamesById: GamesMap = {}

console.log('Worker started!')
console.log('Worker Games', games)
console.log('Worker Games by ID', gamesById)

// Invoke worker
;(async () => {
	postMessage({
		isLoading: true,
	})

	postMessage({
		error: undefined,
	})

	try {
		const res = await fetch(API_URL)
		const gamesData: Game[] = await res.json()
		const gamesDataById = gamesData.reduce(
			(gamesById: GamesMap, gameDataItem: Game) => {
				gamesById[gameDataItem.id] = gameDataItem
				return gamesById
			},
			{},
		)

		postMessage({
			games: gamesData,
			gamesById: gamesDataById,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			postMessage({
				error: err.message,
			})
		} else {
			console.error(err)
		}
	}

	postMessage({
		isLoading: false,
	})
})()
