import React, { memo, useCallback } from 'react'
import { Game, GameBet } from '../../_types'

import BaseGameCard from '../_common/BaseGameCard/BaseGameCard'
import BaseGame from '../_common/BaseGame/BaseGame'

const BaseGameCardMemorized = memo(BaseGameCard)
const BaseGameMemorized = memo(BaseGame)

type GamesListProps = {
	games: Game[]
	bets: {
		[key: string]: GameBet
	}
	onBetGame: (gameId: string, teamId?: string) => void
}

const GamesList: React.FC<GamesListProps> = ({ games, bets, onBetGame }) => {
	const handleBetGame: GamesListProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

	return (
		<div className="grid  md:grid-cols-2 gap-4 sticky top-8">
			{games.map((game) => (
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
