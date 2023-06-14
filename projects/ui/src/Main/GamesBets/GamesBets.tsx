import React from 'react'
import { Game, GamesMap, GameBet } from '../../_types'

type GameBetsProps = {
	gamesById: GamesMap
	bets: GameBet[]
}

const GameBets: React.FC<GameBetsProps> = ({ bets, gamesById }) => {
	return (
		<div className="w-full p-4 rounded-lg shadow-lg bg-white sticky top-8 min-h-[400px]  ">
			Betting Widget
			<div className="divide-y">
				{bets.map((bet) => (
					<div key={bet.gameId}>
						Game: {gamesById[bet.gameId].id}
						Team: {bet.teamId}
						{/* Bet: {gamesById[bet.gameId]} */}
					</div>
				))}
			</div>
		</div>
	)
}

export default GameBets
