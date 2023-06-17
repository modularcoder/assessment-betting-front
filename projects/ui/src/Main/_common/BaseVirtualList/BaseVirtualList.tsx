import { throttle } from '@/_services/utilsService'

import React, { useState, useMemo, useRef, useEffect } from 'react'

type BaseVirtualListProps = {
	rowGap?: number
	rowHeight: number
	items: unknown[]
	renderItem: (index: number, isComputing?: boolean) => JSX.Element
	debug?: boolean
}

const BaseVirtualList: React.FC<BaseVirtualListProps> = ({
	items,
	rowGap,
	rowHeight,
	renderItem,
	debug,
}) => {
	const listRef = useRef<HTMLDivElement>(null)

	const [debugState, setDebugState] = useState<unknown>()

	const [startItemIndex, setStartItemIndex] = useState(0)
	const [endItemIndex, setEndItemIndex] = useState(0)

	const visibleItemsIndexes = useMemo(() => {
		const visibleItemIndexes = []

		for (let i = startItemIndex; i <= endItemIndex; i++) {
			visibleItemIndexes.push(i)
		}

		return visibleItemIndexes
	}, [startItemIndex, endItemIndex])

	const height = Math.max(0, items.length * rowHeight - (rowGap || 0))

	useEffect(() => {
		const updateVisibleItems = () => {
			if (!listRef.current) {
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

			setStartItemIndex(startItemIndex)
			setEndItemIndex(endItemIndex)

			if (debug) {
				setDebugState({
					height,
					listOffset: Math.max(0, -listRef.current.getBoundingClientRect().top),
					itemsPerVirtualPage,
					virtualPageHieght,
					numVirtualPages,
					currentPage,
					prevPage,
					nextPage,
					startItemIndex,
					endItemIndex,
				})
			}
		}

		window.addEventListener('scroll', throttle(updateVisibleItems, 150))
		window.addEventListener('resize', throttle(updateVisibleItems, 150))

		updateVisibleItems()

		return () => {
			window.removeEventListener('scroll', updateVisibleItems)
			window.removeEventListener('resize', updateVisibleItems)
		}
	}, [rowGap, rowHeight, items, debug, height])

	return (
		<div
			style={{
				height,
			}}
			ref={listRef}
			className="relative"
		>
			{debug && (
				<div className="fixed bg-blue-700 color-white top-0 z-30 left-1/3">
					{JSON.stringify(debugState, null, 2)}
				</div>
			)}
			{items.length &&
				visibleItemsIndexes.map((itemIndex) => (
					<div
						key={itemIndex}
						style={{
							position: 'absolute',
							width: `100%`,
							top: rowHeight * itemIndex,
						}}
					>
						{renderItem(itemIndex)}
					</div>
				))}
		</div>
	)
}

export default BaseVirtualList
