import { memo, useCallback } from 'react'
import useGames from './_hooks/useGames'
import GamesList from './GamesList/GamesList'
import GamesBets from './GamesBets/GamesBets'

const Main = () => {
	const { games, gamesById, bets, betsByGameId, betGame } = useGames()

	const handleBet: (gameId: string, teamId?: string) => void = useCallback(
		(gameId, teamId?: string) => {
			console.log(`Game ${gameId} ${teamId}`)

			betGame(gameId, teamId)
		},
		[],
	)

	return (
		<main className="grid grid-cols-3 gap-4  container mx-auto py-8">
			{/* Games */}
			<div className="col-span-2">
				<GamesList games={games} bets={betsByGameId} onBetGame={handleBet} />
			</div>

			{/* GamesBets */}
			<div className="">
				<GamesBets gamesById={gamesById} bets={bets} />
			</div>
		</main>
	)
}

export default Main
