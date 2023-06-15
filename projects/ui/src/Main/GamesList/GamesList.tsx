import React, { memo, useCallback } from 'react'
import { Game, GameBet } from '../../_types'

import BaseSkeleton from '../_common/BaseSkeleton/BaseSkeleton'
import BaseGameCard from '../_common/BaseGameCard/BaseGameCard'
import BaseGame from '../_common/BaseGame/BaseGame'

const BaseGameCardMemorized = memo(BaseGameCard)
const BaseGameMemorized = memo(BaseGame)

type GamesListProps = {
	games: Game[]
	bets: {
		[key: string]: GameBet
	}
	isLoading: boolean
	onBetGame: (gameId: string, teamId?: string) => void
}

const GamesList: React.FC<GamesListProps> = ({
	isLoading,
	games,
	bets,
	onBetGame,
}) => {
	const handleBetGame: GamesListProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

	return (
		<div className="grid  md:grid-cols-2 gap-4 sticky top-8">
			{isLoading &&
				Array(10)
					.fill(null)
					.map((_, index) => (
						<BaseSkeleton key={index} className="h-[120px] w-full" />
					))}

			{!isLoading &&
				games.map((game) => (
					<BaseGameCardMemorized key={game.id}>
						<BaseGameMemorized
							game={game}
							bet={bets[game.id]}
							onBet={handleBetGame}
						/>
					</BaseGameCardMemorized>
				))}
		</div>
	)
}

export default GamesList
