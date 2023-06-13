import { memo, useCallback } from 'react'
import useGames from './_hooks/useGames'
import BaseGame from './_common/BaseGame/BaseGame'

const BaseGameMemorized = memo(BaseGame)

const Main = () => {
	const { games } = useGames()

	const handleBet = useCallback(() => {
		console.log('Update bet for the game ID')
	}, [])

	return (
		<main className="grid grid-cols-3 gap-4  container mx-auto py-8">
			{/* Games */}
			<div className="grid col-span-2 grid-cols-2 gap-4">
				{games.map((game) => (
					<BaseGameMemorized key={game.id} game={game} onBet={handleBet} />
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
