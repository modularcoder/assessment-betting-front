import { memo, useCallback, useEffect, Profiler } from 'react'
import { useGamesSubscription, useGames, useGamesBets } from './_hooks'
import TheHeader from './_common/TheHeader/TheHeader'
import Games from './Games/Games'
import GamesBets from './GamesBets/GamesBets'

const Main = () => {
	const { isLoading, isLive } = useGamesSubscription()
	const { games, gamesById } = useGames()
	const { bets, betsByGameId, betGame } = useGamesBets()

	const handleBet: (gameId: string, teamId?: string) => void = useCallback(
		(gameId, teamId?: string) => {
			console.log(`Game ${gameId} ${teamId}`)

			betGame(gameId, teamId)
		},
		[],
	)

	const onRender = useCallback((...args: any) => {
		const [id, phase, actualDuration, baseDuration, startTime, commitTime] =
			args

		// console.log('Profiler: Games List Rerendered')
		// console.log(`
		// 	id: ${id},
		// 	phase ${phase},
		// 	actualDuration ${actualDuration},
		// 	baseDuration ${baseDuration},
		// 	startTime ${startTime},
		// 	commitTime	${commitTime}
		// `)
	}, [])

	return (
		<main>
			<TheHeader isLive={isLive} />
			<div className="grid grid-cols-3 gap-4  container mx-auto py-8 min-h-[400px]">
				{/* Games */}
				<div className="col-span-2">
					<Profiler id="GamesList" onRender={onRender}>
						<Games
							games={games}
							bets={betsByGameId}
							onBetGame={handleBet}
							isLoading={isLoading}
						/>
					</Profiler>
				</div>

				{/* GamesBets */}
				<div>
					<div className="sticky flex top-20 h-[calc(100vh-112px)]">
						<GamesBets
							gamesById={gamesById}
							bets={bets}
							onBetGame={handleBet}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Main
