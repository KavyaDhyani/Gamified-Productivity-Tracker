import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { endSession, getAllSessions, getStats, startSession } from '../controllers/session.controllers.js'

// Session-related routes

const sessionRouter = express.Router()

sessionRouter.post('/start', isAuth, startSession)
sessionRouter.post('/end', isAuth, endSession)
sessionRouter.get('/stats', isAuth, getStats)
sessionRouter.get('/', isAuth, getAllSessions)

export default sessionRouter