import React, { useCallback, useLayoutEffect, useState, useRef } from 'react'

import { Game, GameBet } from '../../_types'
import { throttle } from '@/_services/utilsService'

import BaseSkeleton from '../_common/BaseSkeleton/BaseSkeleton'
import { BaseGameCardMemorized } from '../_common/BaseGameCard/BaseGameCard'

type GamesListProps = {
	height: number
	rowHeight: number
	items: Game[]
	renderItem: (index: number, isComputing?: boolean) => JSX.Element
}

const GamesList: React.FC<GamesListProps> = ({
	items,
	height,
	rowHeight,
	renderItem,
}) => {
	const listRef = useRef<HTMLDivElement>(null)
	const [visibleItemsIndexes, setVisibleItemsIndexes] = useState<number[]>([])

	// console.log('Games List Rendered')

	useLayoutEffect(() => {
		const updateVisibleItems = () => {
			if (!listRef.current) {
				console.log('Why god why')

				return
			}

			const itemsPerVirtualPage = Math.floor(window.innerHeight / rowHeight)
			const virtualPageHieght = itemsPerVirtualPage * rowHeight
			const numVirtualPages = Math.ceil(height / virtualPageHieght)

			const currentPage =
				Math.floor(
					Math.max(0, -listRef.current.getBoundingClientRect().top) /
						virtualPageHieght,
				) + 1
			const prevPage = Math.max(1, currentPage - 1)
			const nextPage = Math.min(numVirtualPages, currentPage + 1)

			const startItemIndex = Math.max(0, (prevPage - 1) * itemsPerVirtualPage)
			const endItemIndex = Math.min(
				items.length - 1,
				nextPage * itemsPerVirtualPage,
			)

			const visibleItemIndexes = []

			for (let i = startItemIndex; i <= endItemIndex; i++) {
				visibleItemIndexes.push(i)
			}

			setVisibleItemsIndexes(visibleItemIndexes)
		}

		window.addEventListener('scroll', throttle(updateVisibleItems, 100))
		window.addEventListener('resize', throttle(updateVisibleItems, 100))

		updateVisibleItems()

		return () => {
			window.removeEventListener('scroll', updateVisibleItems)
			window.removeEventListener('resize', updateVisibleItems)
		}
	}, [])

	return (
		<div
			style={{
				height,
			}}
			ref={listRef}
			className="relative"
		>
			{visibleItemsIndexes.map((itemIndex) => (
				<div
					key={itemIndex}
					style={{
						position: 'absolute',
						width: `100%`,
						top: rowHeight * itemIndex,
					}}
				>
					<span className="absolute ">{itemIndex + 1}</span>
					{renderItem(itemIndex)}
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
	// console.log('--------------------')
	// console.log('GamesList rendered')

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

			{!isLoading && games.length && (
				<GamesList
					items={games}
					height={ROW_HEIGHT * games.length - CARD_GAP}
					rowHeight={ROW_HEIGHT}
					renderItem={(index: number) => (
						<>
							{isLoading ? (
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
			)}

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
