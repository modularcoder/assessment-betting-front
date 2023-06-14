import useStore from '../../_stores/useStore'

export default function useGamesBets() {
	// Central store
	const { bets, betsByGameId, betGame } = useStore((state) => ({
		games: state.games,
		gamesById: state.gamesById,
		bets: state.bets,
		betsByGameId: state.betsByGameId,
		setGames: state.setGames,
		updateGames: state.updateGames,
		betGame: state.betGame,
	}))

	return {
		bets,
		betsByGameId,
		betGame,
	}
}
