import express from 'express'
import { getUser, signOut, signIn, signUp } from '../controllers/auth.controllers.js'
import isAuth from '../middleware/isAuth.js'

// Authentication-related routes

const authRouter = express.Router()


authRouter.post('/signup', signUp)

authRouter.post('/signin', signIn)

authRouter.post("/signout", signOut)

authRouter.get("/me", isAuth, getUser)

export default authRouter