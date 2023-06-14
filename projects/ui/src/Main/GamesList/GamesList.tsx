import React, { memo, useCallback } from 'react'
import { Game, GameBet } from '../../_types'
import BaseGame from '../_common/BaseGame/BaseGame'

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
		<div className="grid  md:grid-cols-2 gap-4">
			{games.map((game) => (
				<BaseGameMemorized
					key={game.id}
					game={game}
					bet={bets[game.id]}
					onBet={handleBetGame}
				/>
			))}
		</div>
	)
}

export default GamesList
