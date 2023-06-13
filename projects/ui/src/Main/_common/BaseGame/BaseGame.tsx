import React, { useRef, useLayoutEffect } from 'react'
import { Game } from '../../../../../_types/index'
import LogoCS from './LogoCS.svg'
import LogoDota from './LogoDota.svg'

type BaseGameProps = {
	game: Game & { numUpdates: number }
	onBet: (options: { teamId: string; gameId: string }) => void
}

const BaseGame: React.FC<BaseGameProps> = ({ game, onBet }) => {
	const numRenders = useRef(0)

	// Run this on first render
	useLayoutEffect(() => {
		numRenders.current += 1

		if (numRenders.current === 1) {
			return
		}
	})

	return (
		<div
			key={game.id}
			className="w-full rounded-lg shadow-lg bg-white overflow-hidden flex flex-col"
		>
			<div className="p-4 flex flex-row space-x-2  flex-1">
				{/* Game Logo */}
				<div>
					<div className="w-16 aspect-square rounded-lg shadow overflow-hidden">
						{game.type === 'cs' && (
							<img className="object-cover " src={LogoCS} alt="Counter Stike" />
						)}
						{game.type === 'dota' && (
							<img className=" object-cover " src={LogoDota} alt="Dota" />
						)}
					</div>
				</div>
				<div className="divide-y flex-1 ">
					{game.teams.map((team) => (
						<div
							key={team.id}
							className="flex flex-row justify-between py-1 space-x-2"
						>
							<div className=" line-clamp-1">{team.name} </div>
							<button
								onClick={() => onBet({ teamId: team.id, gameId: game.id })}
								className="
							bg-blue-400 py-1 px-2 text-xs
							text-white font-medium  rounded min-w-[70px] text-center
							"
							>
								{team.coefficient}
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Debugging footer */}
			<footer className="py-1 px-3 bg-zinc-100 text-xs text-zinc-500 ">
				Rendered {numRenders.current} times, data updated {game.numUpdates}{' '}
				times
			</footer>
		</div>
	)
}

export default BaseGame
