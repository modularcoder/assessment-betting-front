import useGames from './_hooks/useGames'

const Main = () => {
	const { games } = useGames()

	return (
		<main className="grid grid-cols-3 gap-4  container mx-auto py-8">
			{/* Games */}
			<div className="grid col-span-2 grid-cols-2 gap-4">
				{games.map((game) => (
					<div
						key={game.id}
						className="w-full p-4 rounded-lg shadow-lg bg-white"
					>
						<div>{game.type}</div>
						<div className="divide-y ">
							{game.teams.map((team) => (
								<div
									key={team.id}
									className="flex flex-row justify-between p-1"
								>
									{team.name}{' '}
									<button className=" bg-blue-400 py-1 px-2 text-xs text-white font-medium  rounded min-w-[80px] text-center ">
										{team.coefficient}
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* User */}
			<div className="w-full p-4 rounded-lg shadow-lg bg-white">
				User Context
			</div>
		</main>
	)
}

export default Main
