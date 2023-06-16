import React from 'react'
import clsx from 'clsx'

type TheHeaderProps = {
	isLive: boolean
}

const TheHeader: React.FC<TheHeaderProps> = ({ isLive }) => {
	return (
		<header
			className="
				bg-zinc-800 backdrop-blur bg-opacity-90 px-4 text-zinc-100 sticky top-0 z-10 h-12
				flex items-center justify-between cursor-default
			"
		>
			<h1 className=" text-lg font-semibold ">BettingFront</h1>

			<div className="flex items-center space-x-2 text-xs font-medium uppercase ">
				{isLive ? (
					<div>live</div>
				) : (
					<div className=" text-zinc-400 animate-pulse">offline</div>
				)}
				<div
					className={clsx(
						`rounded-full w-2 h-2`,
						isLive ? ' bg-emerald-500     ' : 'animate-pulse bg-gray-400',
					)}
				/>
			</div>
		</header>
	)
}

export default TheHeader
