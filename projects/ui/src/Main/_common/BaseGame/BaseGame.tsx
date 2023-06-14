import clsx from 'clsx'
import React, { useRef, useLayoutEffect } from 'react'

import { Game } from '../../../_types/index'
import LogoCS from './LogoCS.svg'
import LogoDota from './LogoDota.svg'

type BaseGameProps = {
	game: Game & { numUpdates?: number }
	bet?: {
		teamId?: string
		amount?: number
	}
	onBet: (gameId: string, teamId?: string) => void
}

const BaseGame: React.FC<BaseGameProps> = ({ game, bet, onBet }) => {
	const handleBetButtonClick = (teamId: string) => {
		const newTeamId =
			bet && bet.teamId && bet.teamId === teamId ? undefined : teamId

		onBet(game.id, newTeamId)
	}

	return (
		<div className="flex flex-row space-x-2  flex-1">
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
							onClick={() => handleBetButtonClick(team.id)}
							className={clsx(
								`
									py-1 px-2 text-xs
									text-white font-medium  rounded min-w-[70px] text-center
								`,
								bet && bet.teamId === team.id ? 'bg-green-600' : 'bg-zinc-400',
							)}
						>
							{team.coefficient}
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default BaseGame
