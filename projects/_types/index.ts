export type Game = {
	id: string
	type: string
	teams: {
		id: string
		name: string
		coefficient: number
	}[]
}
