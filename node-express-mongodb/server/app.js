import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/campo.js'

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use('/api/campo', router)

export default app