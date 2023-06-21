import React, { useCallback } from 'react'

import { Game, GameBet } from '../../_types'

import BaseVirtualList from '../_common/BaseVirtualList/BaseVirtualList'
import BaseSkeleton from '../_common/BaseSkeleton/BaseSkeleton'
import { BaseGameCardMemorized } from '../_common/BaseGameCard/BaseGameCard'

type GamesProps = {
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

const Games: React.FC<GamesProps> = ({ isLoading, games, bets, onBetGame }) => {
	const handleBetGame: GamesProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

	return (
		<div>
			{isLoading && (
				<div className="space-y-4">
					{Array(10)
						.fill(null)
						.map((_, index) => (
							<BaseSkeleton key={index} className="h-[120px]" />
						))}
				</div>
			)}

			{!isLoading && games.length > 0 && (
				<BaseVirtualList
					debug={false}
					items={games}
					rowGap={CARD_GAP}
					rowHeight={ROW_HEIGHT}
					renderItem={(index: number) => (
						<BaseGameCardMemorized
							game={games[index]}
							bet={bets[games[index].id]}
							onBet={handleBetGame}
							gameNumber={index + 1}
						/>
					)}
				/>
			)}
		</div>
	)
}

export default Games
