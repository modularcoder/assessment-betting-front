import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { Game } from '../../../../_types'

// This should come from .env
const API_URL = 'http://127.0.0.1:8080/games'
const WS_URL = 'ws://127.0.0.1:8080/games'

type GamesMap = { [key: string]: Game }

export default function () {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>()
	const [isLive, setIsLive] = useState(false)
	const [games, setGames] = useState<Game[]>([])

	// Make initial call to REST api
	useEffect(() => {
		async function getData() {
			setIsLoading(true)
			setError(undefined)

			try {
				const res = await fetch(API_URL)
				const gamesData: Game[] = await res.json()

				console.log('games data', gamesData)

				setGames(gamesData)
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
			console.log('New message', message)

			const gamesUpdated = JSON.parse(message.data) as Game[]
			const gamesUpdatedById = gamesUpdated.reduce(
				(gamesById: GamesMap, game) => {
					gamesById[game.id] = game

					return gamesById
				},
				{},
			)

			setGames((prevState) =>
				prevState.map((game) => {
					return gamesUpdatedById[game.id] ? gamesUpdatedById[game.id] : game
				}),
			)
		},
	})

	return {
		isLive,
		isLoading,
		error,
		games,
	}
}
