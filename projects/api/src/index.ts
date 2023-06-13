// import http from 'http'
import express, { Express, Request, Response } from 'express'
import expressWs from 'express-ws'
import { getGames, updateRandomGame } from './_services/gamesService'
import cors from 'cors'

const port = 8080

const appBase: Express = express()
const appWS = expressWs(appBase)
let { app } = appWS

expressWs(app)

app.use(
	cors({
		origin: '*',
	}),
)

app.get('/games', (req: Request, res: Response) => {
	res.json(getGames())
})

app.ws('/games', function (ws, req) {
	// ws.on('open', () => {
	// 	ws.send(JSON.stringify(getGames()))
	// })

	ws.on('message', function (msg) {
		console.log(msg)
	})

	// Send update about 30 dandom games every 50 ms
	setInterval(() => {
		ws.send(
			JSON.stringify(
				Array(30)
					.fill(null)
					.map(() => updateRandomGame()),
			),
		)
	}, 5000)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})