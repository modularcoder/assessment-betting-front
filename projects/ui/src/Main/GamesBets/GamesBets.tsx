import React, { useCallback } from 'react'
import { GamesMap, GameBet } from '../../_types'
import { BaseGameMemorized } from '../_common/BaseGame/BaseGame'

type GameBetsProps = {
	gamesById: GamesMap
	bets: GameBet[]
	onBetGame: (gameId: string, teamId?: string) => void
}

const GameBets: React.FC<GameBetsProps> = ({ bets, gamesById, onBetGame }) => {
	const handleBetGame: GameBetsProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

	return (
		<div className="w-full p-4 rounded-lg shadow-lg bg-white flex-1 overflow-y-auto  ">
			Active Bets
			<div className="divide-y">
				{bets.map((bet) => (
					<div key={bet.gameId} className="py-4">
						<BaseGameMemorized
							game={gamesById[bet.gameId]}
							bet={bet}
							onBet={handleBetGame}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default GameBets
