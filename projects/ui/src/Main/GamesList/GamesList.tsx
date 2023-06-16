import React, { useCallback } from 'react'
import { Game, GameBet } from '../../_types'

import BaseSkeleton from '../_common/BaseSkeleton/BaseSkeleton'
import { BaseGameCardMemorized } from '../_common/BaseGameCard/BaseGameCard'

type GamesListProps = {
	games: Game[]
	bets: {
		[key: string]: GameBet
	}
	isLoading: boolean
	onBetGame: (gameId: string, teamId?: string) => void
}

const CARD_HEIGHT = 120
const CARD_GAP = 16
const ROW_HEIGHT = CARD_HEIGHT + CARD_GAP

const GamesList: React.FC<GamesListProps> = ({
	isLoading,
	games,
	bets,
	onBetGame,
}) => {
	console.log('--------------------')
	console.log('GamesList rendered')

	const handleBetGame: GamesListProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

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
						<BaseSkeleton
							key={index}
							className="h-[120px]"
							style={{
								position: 'absolute',
								width: `calc(50% - ${CARD_GAP}px)`,
								left: index % 2 === 1 ? '50%' : '0',
								top: ROW_HEIGHT * Math.floor(index / 2),
							}}
						/>
					))}

			{!isLoading &&
				games.map((game, index) => (
					<div
						key={game.id}
						style={{
							position: 'absolute',
							width: `calc(50% - ${CARD_GAP}px)`,
							left: index % 2 === 1 ? '50%' : '0',
							top: ROW_HEIGHT * Math.floor(index / 2),
						}}
					>
						<BaseGameCardMemorized
							game={game}
							bet={bets[game.id]}
							onBet={handleBetGame}
						/>
					</div>
				))}
		</div>
	)
}

export default GamesList
