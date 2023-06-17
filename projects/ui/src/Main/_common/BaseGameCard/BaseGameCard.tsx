import React, { memo, useRef, useLayoutEffect } from 'react'
import BaseGame, { BaseGameProps } from '../BaseGame/BaseGame'

type BaseGameCardProps = BaseGameProps & {
	gameNumber?: number
}

const BaseGameCard: React.FC<BaseGameCardProps> = ({
	gameNumber,
	...props
}) => {
	const numRenders = useRef(0)

	// Run this on first render
	useLayoutEffect(() => {
		numRenders.current += 1

		if (numRenders.current === 1) {
			return
		}
	})

	return (
		<div className="w-full rounded-lg shadow-lg bg-white overflow-hidden flex flex-col">
			<div className="p-4">
				<BaseGame {...props} />
			</div>
			{/* Debugging footer */}
			<footer className="py-1 px-3 bg-zinc-100 text-xs text-zinc-500 ">
				Game No. {gameNumber} | Rendered {numRenders.current} times after
				mounting
			</footer>
		</div>
	)
}

export const BaseGameCardMemorized = memo(
	BaseGameCard,
	(prevProps, nextProps) => {
		return (
			prevProps.game.id === nextProps.game.id &&
			prevProps.bet?.teamId === nextProps.bet?.teamId &&
			prevProps.bet?.amount === nextProps.bet?.amount
		)
	},
)

export default BaseGameCard
