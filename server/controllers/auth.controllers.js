import genToken from '../config/token.js'
import User from '../models/user.model.js'


// Create a new user account
export const signUp = async (req, res)=>{
    try{
        const {name, email, password} = req.body

        // Check if user already exists
        const existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: "User already exists"})
        }

        // Create a new user
        const user = await User.create({name, email, password})

        const token = genToken(user._id)
        
        // Save jwt in cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "none",   
            secure: true,         
            maxAge: 30*24*60*60*1000
        })

        res.status(201).json({
            name: user.name,
            email: user.email,
            message: "User registered successfully",
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


// Authenticate and sign in a user
export const signIn = async (req, res)=>{
    try{
        const {email, password} = req.body

        // Check if user exists
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        else if( !(await user.verifyPassword(password))){
            return res.status(401).json({message: "Invalid Password"})
        }

        const token = genToken(user._id)
        console.log()

        // Save jwt in cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30*24*60*60*1000
        })

        res.json({
            name: user.name,
            email: user.email,
            message: "User signed in successfully",
        })

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// Sign out a user by clearing the authentication cookie
export const signOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Get user details if authenticated
export const getUser = async(req,res)=>{
    try {
        const user = req.user;
        res.json({ isAuthenticated: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}