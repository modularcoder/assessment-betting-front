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

const CARD_HEIGHT = 120
const CARD_GAP = 16
const ROW_HEIGHT = CARD_HEIGHT + CARD_GAP

const MemorizedTest = memo(function Test({
	game,
	onBet,
	betTeamId,
	betAmmount,
}: {
	game: Game
	betTeamId?: string
	betAmmount?: number
	onBet: (args: any) => void
}) {
	console.log('Memorized test rendered', game.id)

	return (
		<div>
			Test {game.id} {betTeamId} {betAmmount}
		</div>
	)
})

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

			{/* {!isLoading &&
				games.map((game, index) => (
					<BaseGameCardMemorized key={game.id}>
						<MemorizedTest
							game={game}
							onBet={handleBetGame}
							betTeamId={bets[game.id]?.teamId}
							betAmmount={bets[game.id]?.amount}
						/>
					</BaseGameCardMemorized>
				))} */}

			{!isLoading &&
				games.map((game, index) => (
					<BaseGameCardMemorized
						key={game.id}
						// style={{
						// 	position: 'absolute',
						// 	width: `calc(50% - ${CARD_GAP}px)`,
						// 	left: index % 2 === 1 ? '50%' : '0',
						// 	top: `${ROW_HEIGHT * Math.floor(index / 2)}`,
						// }}
					>
						<BaseGameMemorized
							game={game}
							betTeamId={bets[game.id]?.teamId}
							betAmmount={bets[game.id]?.amount}
							onBet={handleBetGame}
						/>
					</BaseGameCardMemorized>
				))}
		</div>
	)
}

export default GamesList
