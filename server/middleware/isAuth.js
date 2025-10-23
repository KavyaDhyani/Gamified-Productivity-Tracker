import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// Middleware to verify if the user is authenticated
const isAuth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Fetch user from DB
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    // Attach user to request object
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}

export default isAuth
