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

	const CARD_HEIGHT = 120
	const CARD_GAP = 16
	const ROW_HEIGHT = CARD_HEIGHT + CARD_GAP

	return (
		<div
			className="relative"
			style={{
				height: ROW_HEIGHT * Math.ceil(games.length / 2) - CARD_GAP,
			}}
		>
			{isLoading &&
				Array(10)
					.fill(null)
					.map((_, index) => (
						<BaseSkeleton key={index} className="h-[120px] w-full" />
					))}

			{!isLoading &&
				games.map((game, index) => (
					<div
						style={{
							position: 'absolute',
							width: `calc(50% - ${CARD_GAP}px)`,
							left: index % 2 === 1 ? '50%' : '0',
							top: ROW_HEIGHT * Math.floor(index / 2),
						}}
					>
						<BaseGameCardMemorized key={game.id}>
							<BaseGameMemorized
								game={game}
								bet={bets[game.id]}
								onBet={handleBetGame}
							/>
						</BaseGameCardMemorized>
					</div>
				))}
		</div>
	)
}

export default GamesList
