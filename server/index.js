import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import sessionRouter from './routes/session.routes.js'

// Initialize environment variables and express app
dotenv.config()
const app = express()

// Connect to MongoDB
connectDb()

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))

//routes
app.get("/", (req, res) => res.status(200).send("Server running")) // route for uptime robot to ping the server
app.use('/api/auth', authRouter)
app.use('/api/session', sessionRouter)


// Start the server
app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server is running on port:", process.env.PORT)
})

export default app