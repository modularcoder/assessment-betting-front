import useStore from '../../_stores/useStore'

export default function useGames() {
	// Central store
	const { games, gamesById } = useStore((state) => ({
		games: state.games,
		gamesById: state.gamesById,
	}))

	return {
		games,
		gamesById,
	}
}
