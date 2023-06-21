import { Game, GamesMap } from '../../_types'

// This should come from .env
const GAMES_UPDATE_INTERVAL = 500
const API_URL = '/api/games'
// const WS_URL = 'ws://127.0.0.1:8080/games'

export const test = () => {
	return API_URL
}

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
	// const gamesUpdatedById: GamesMap = {}

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

	let isLive = false

	// Occasionarry switch the online status
	setInterval(() => {
		isLive = !isLive

		postMessage({
			action: 'setIsLive',
			payload: isLive,
		})
	}, 10000)

	// Notify about the updates
	setInterval(() => {
		postMessage({
			action: 'updateGames',
			payload: {
				...gamesById,
			},
		})
		// Purge updated games dictionary
		// gamesUpdatedById = {}
	}, GAMES_UPDATE_INTERVAL)
})()
