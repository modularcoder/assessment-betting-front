import { Game, GamesMap } from '../../_types'

// This should come from .env
const GAMES_UPDATE_INTERVAL = 3000
const API_URL = 'http://127.0.0.1:8080/games'
const WS_URL = 'ws://127.0.0.1:8080/games'

// Fetch games with REST api
async function fetchGames() {
	const res = await fetch(API_URL)
	const gamesData: Game[] = await res.json()
	const gamesDataById = gamesData.reduce(
		(gamesById: GamesMap, gameDataItem: Game) => {
			gamesById[gameDataItem.id] = gameDataItem
			return gamesById
		},
		{},
	)

	return { gamesData, gamesDataById }
}

// Invoke worker
;(async () => {
	let games: Game[] = []
	let gamesById: GamesMap = {}

	postMessage({
		action: 'setIsLoading',
		payload: true,
	})

	postMessage({
		action: 'setError',
		payload: undefined,
	})

	try {
		const { gamesData, gamesDataById } = await fetchGames()

		games = gamesData
		gamesById = gamesDataById
	} catch (err: unknown) {
		if (err instanceof Error) {
			postMessage({
				action: 'setError',
				payload: err.message,
			})
		} else {
			console.error(err)
		}
	}

	postMessage({
		action: 'setGames',
		payload: {
			games,
			gamesById,
		},
	})

	postMessage({
		action: 'setIsLoading',
		payload: false,
	})

	// Notify about the updates
	setInterval(() => {
		postMessage({
			action: 'updateGames',
			payload: gamesById,
		})
	}, GAMES_UPDATE_INTERVAL)
})()
