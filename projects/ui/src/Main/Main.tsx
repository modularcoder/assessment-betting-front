import { memo, useCallback } from 'react'
import useGames from './_hooks/useGames'
import GamesList from './GamesList/GamesList'
import { GameBet } from '../_types'

const Main = () => {
	const { games, betGame, betsByGameId } = useGames()

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
			<GamesList games={games} bets={betsByGameId} onBetGame={handleBet} />

			{/* User */}
			<div className="">
				<div className="w-full p-4 rounded-lg shadow-lg bg-white sticky top-8 min-h-[400px]  ">
					Betting Widget
				</div>
			</div>
		</main>
	)
}

export default Main
