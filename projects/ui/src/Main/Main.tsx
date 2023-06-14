import { useCallback, useEffect } from 'react'
import useGames from './_hooks/useGames'
import GamesList from './GamesList/GamesList'
import GamesBets from './GamesBets/GamesBets'

const Main = () => {
	const { isLoading, games, gamesById, bets, betsByGameId, betGame } =
		useGames()

	useEffect(() => {
		console.log('Main mounted')
	}, [])

	// const games = gamesAll.slice(0, 10)

	const handleBet: (gameId: string, teamId?: string) => void = useCallback(
		(gameId, teamId?: string) => {
			console.log(`Game ${gameId} ${teamId}`)

			betGame(gameId, teamId)
		},
		[],
	)

	return (
		<main className="grid grid-cols-3 gap-4  container mx-auto py-8 min-h-[400px]">
			{/* Games */}
			<div className="col-span-2">
				<GamesList
					games={games}
					bets={betsByGameId}
					onBetGame={handleBet}
					isLoading={isLoading}
				/>
			</div>

			{/* GamesBets */}
			<div>
				<div className="sticky flex top-8 h-[calc(100vh-64px)]">
					<GamesBets gamesById={gamesById} bets={bets} onBetGame={handleBet} />
				</div>
			</div>
		</main>
	)
}

export default Main
