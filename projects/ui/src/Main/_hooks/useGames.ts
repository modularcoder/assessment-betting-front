import { useState, useEffect } from 'react'
import useBetsStore from '../../_stores/useBetsStore'
import GamesWorker from './useGames.worker.ts?worker'

export default function useGames() {
	console.log('use Games')

	// const worker = useWorker(createWorker)

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>()
	const [isLive, setIsLive] = useState(false)

	const {
		games,
		gamesById,
		bets,
		betsByGameId,
		setGames,
		updateGames,
		betGame,
	} = useBetsStore((state) => ({
		games: state.games,
		gamesById: state.gamesById,
		bets: state.bets,
		betsByGameId: state.betsByGameId,
		setGames: state.setGames,
		updateGames: state.updateGames,
		betGame: state.betGame,
	}))

	// Subscribe/unsubscribe from worker events
	useEffect(() => {
		setIsLoading(true)

		const worker = new GamesWorker()

		worker.onmessage = (message) => {
			console.log('Message from worker', message)
		}

		worker.onerror = (err: unknown) => {
			if (err instanceof Error) {
				setIsLoading(false)
				setError(err.message)
			}
		}

		// Terminate the web worker on unmount
		return () => {
			console.log('terminate the web worker')
			worker.terminate()
		}
	}, [])

	return {
		isLoading,
		error,
		isLive,
		games,
		gamesById,
		bets,
		betsByGameId,
		betGame,
	}
}

/*
function useGamesLegacy() {
	const { games, gamesById, bets, betsByGameId, setGames, betGame } =
		useBetsStore((state) => ({
			games: state.games,
			gamesById: state.gamesById,
			bets: state.bets,
			betsByGameId: state.betsByGameId,
			setGames: state.setGames,
			betGame: state.betGame,
		}))

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>()
	const [isLive, setIsLive] = useState(false)

	// const [games, setGames] = useState<GameData[]>([])

	// Make initial call to REST api
	useEffect(() => {
		async function getData() {
			setIsLoading(true)
			setError(undefined)

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

				setGames(gamesData, gamesDataById)
			} catch (err) {
				console.error('err', err)
				setError('Could not load the data')
			}
		}

		getData()
	}, [])

	useWebSocket(WS_URL, {
		reconnectInterval: 3000,
		onOpen: () => {
			console.log('WebSocket connection established.')

			setIsLive(true)
		},
		onClose: () => {
			console.log('WebSocket connection closed.')

			setIsLive(false)
		},
		onMessage: (message) => {
			const gamesUpdated = JSON.parse(message.data) as Game[]
			const gamesUpdatedById = gamesUpdated.reduce(
				(gamesById: GamesMap, game) => {
					gamesById[game.id] = game

					return gamesById
				},
				{},
			)

			setGames(gamesUpdated, gamesUpdatedById)

			// setGames((prevState) =>
			// 	prevState.map((game) => {
			// 		if (gamesUpdatedById[game.id]) {
			// 			return {
			// 				numUpdates: game.numUpdates + 1,
			// 				...gamesUpdatedById[game.id],
			// 			}
			// 		}

			// 		return game
			// 	}),
			// )
		},
	})

	return {
		isLive,
		isLoading,
		error,
		games,
		gamesById,
		bets,
		betsByGameId,
		betGame,
	}
}

*/
