import { faker } from '@faker-js/faker'
import { sample, random, round } from 'lodash'
import { v4 as uuid } from 'uuid'
import { Game } from '../../../_types'

let games: Game[] = []

const generateRandomCoefficient = () => {
	return round(1 + random(0.1, 1), 2)
}

const generateGames = (numGames: number = 1000) => {
	games = Array(numGames)
		.fill(null)
		.map(() => {
			return {
				id: uuid(),
				type: sample(['cs', 'dota']) as string,
				teams: [
					{
						id: uuid(),
						name: faker.company.name(),
						coefficient: generateRandomCoefficient(),
					},
					{
						id: uuid(),
						name: faker.company.name(),
						coefficient: generateRandomCoefficient(),
					},
				],
			}
		})

	return games
}

export const getGames: () => Game[] = () => {
	return games
}

export const updateRandomGame: () => Game = () => {
	const randomGame = sample(games) as Game

	randomGame.teams = randomGame.teams.map((team) => ({
		...team,
		coefficient: generateRandomCoefficient(),
	}))

	return randomGame
}

// Generate fake 1000 initial games
generateGames(500)
