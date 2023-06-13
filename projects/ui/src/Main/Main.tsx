import { memo, useCallback } from 'react'
import useGames from './_hooks/useGames'
import BaseGame from './_common/BaseGame/BaseGame'

const BaseGameMemorized = memo(BaseGame)

const MINIMAL_BET_AMMOUNT = 150

const Main = () => {
	const { games, betGame, betsByGameId } = useGames()

	const handleBet = useCallback((gameId: string, teamId?: string) => {
		betGame(gameId, teamId, MINIMAL_BET_AMMOUNT)
		console.log('Update bet for the game ID', gameId, teamId)
	}, [])

	return (
		<main className="grid grid-cols-3 gap-4  container mx-auto py-8">
			{/* Games */}
			<div className="grid col-span-2 grid-cols-2 gap-4">
				{games.map((game) => (
					<BaseGameMemorized
						key={game.id}
						game={game}
						bet={betsByGameId[game.id]}
						onBet={handleBet}
					/>
				))}
			</div>

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
