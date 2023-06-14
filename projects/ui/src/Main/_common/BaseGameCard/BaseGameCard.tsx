import React, { useRef, useLayoutEffect } from 'react'

type BaseGameCardProps = {
	children: React.ReactNode
}

const BaseGameCard: React.FC<BaseGameCardProps> = ({ children }) => {
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
			<div className="p-4">{children}</div>
			{/* Debugging footer */}
			<footer className="py-1 px-3 bg-zinc-100 text-xs text-zinc-500 ">
				Rendered {numRenders.current} times
			</footer>
		</div>
	)
}

export default BaseGameCard
