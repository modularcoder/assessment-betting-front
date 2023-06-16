import React, { useCallback, useEffect, useState } from 'react'

import { Game, GameBet } from '../../_types'
import { throttle } from '@/_services/utilsService'

import BaseSkeleton from '../_common/BaseSkeleton/BaseSkeleton'
import { BaseGameCardMemorized } from '../_common/BaseGameCard/BaseGameCard'

type GamesListProps = {
	height: number
	rowHeight: number
	games: Game[]
	renderGame: (index: number, isComputing?: boolean) => JSX.Element
}

const GamesList: React.FC<GamesListProps> = ({
	games,
	height,
	rowHeight,
	renderGame,
}) => {
	const isComputing = false
	const [scrollPosition, setScrollPosition] = useState(window.scrollY)

	console.log('Games List Rendered')

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY)
		}

		window.addEventListener('scroll', throttle(updatePosition, 150))

		updatePosition()

		return () => window.removeEventListener('scroll', updatePosition)
	}, [])

	return (
		<div
			style={{
				height,
			}}
			className="relative bg-red-700"
		>
			<div className="fixed bg-blue-400 rounded-sm text-white text-xs top-2 left-1/2 z-30 p-2">
				Scroll position: {scrollPosition}
			</div>
			{games.map((game, index) => (
				<div
					style={{
						position: 'absolute',
						width: `100%`,
						// left: index % 2 === 1 ? '50%' : '0',
						top: rowHeight * index,
					}}
				>
					{renderGame(index, isComputing)}
				</div>
			))}
		</div>
	)
}

type GamesProps = {
	games: Game[]
	bets: {
		[key: string]: GameBet
	}
	isLoading: boolean
	onBetGame: (gameId: string, teamId?: string) => void
}

// const GamesListRow = ({ index, style }) => (
// 	<div style={style}>
// 		<BaseGameCardMemorized
// 			game={game}
// 			bet={bets[game.id]}
// 			onBet={handleBetGame}
// 		/>
// 	</div>
// )

const Games: React.FC<GamesProps> = ({ isLoading, games, bets, onBetGame }) => {
	console.log('--------------------')
	console.log('GamesList rendered')

	const CARD_HEIGHT = 120
	const CARD_GAP = 16
	const ROW_HEIGHT = CARD_HEIGHT + CARD_GAP
	const LIST_HEIGHT = ROW_HEIGHT * Math.ceil(games.length / 2)

	const handleBetGame: GamesProps['onBetGame'] = useCallback(
		(gameId, teamId) => {
			onBetGame(gameId, teamId)
		},
		[],
	)

	return (
		<div
			className="relative"
			// style={{
			// 	height: ROW_HEIGHT * Math.ceil(games.length / 2) - CARD_GAP,
			// }}
		>
			{/* {isLoading &&
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
					))} */}

			<GamesList
				games={games}
				height={ROW_HEIGHT * games.length - CARD_GAP}
				rowHeight={ROW_HEIGHT}
				renderGame={(index: number, isComputing?: boolean) => (
					<>
						{isLoading || isComputing ? (
							<BaseSkeleton className="h-[120px]" />
						) : (
							<BaseGameCardMemorized
								game={games[index]}
								bet={bets[games[index].id]}
								onBet={handleBetGame}
							/>
						)}
					</>
				)}
			/>

			{/* {!isLoading && (
				<List
					width={'100%'}
					height={500}
					itemCount={games.length}
					itemSize={ROW_HEIGHT}
				>
					{({ index, style }: { index: number; style: any }) => (
						<div style={style}>
							<BaseGameCardMemorized
								game={games[index]}
								bet={bets[games[index].id]}
								onBet={handleBetGame}
							/>
						</div>
					)}
				</List>
			)} */}

			{/* {!isLoading &&
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
				))} */}
		</div>
	)
}

export default Games
