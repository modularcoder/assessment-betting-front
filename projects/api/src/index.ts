// import http from 'http'
import express, { Express, Request, Response } from 'express'
import expressWs from 'express-ws'
import {
	generateGames,
	getGames,
	updateRandomGame,
} from './_services/gamesService'

// Generate fake 2000 initial games
generateGames(10000)

import cors from 'cors'
const port = 8080

const appBase: Express = express()
const appWS = expressWs(appBase)
let { app } = appWS

expressWs(app)

app.options('*', cors())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	next()
})

app.use(
	cors({
		origin: '*',
	}),
)

app.get('/api/games', (req: Request, res: Response) => {
	console.log('qwerty')

	res.json(getGames())
})

app.ws('/api/games', function (ws, req) {
	// Send update about 30 dandom games every 50 ms
	setInterval(() => {
		ws.send(
			JSON.stringify(
				Array(50)
					.fill(null)
					.map(() => updateRandomGame()),
			),
		)
	}, 300)
})

app.listen(port, () => {
	console.log(`API listening on port ${port}`)
})
