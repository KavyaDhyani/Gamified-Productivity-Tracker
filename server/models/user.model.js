import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// defining the user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    streak:{
        type: Number,
        default: 0
    },

    lastActiveDate:{
        type: Date,
    }
})

// pre save hook to hash the password
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')) return next()
        const salt=  await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }catch(error){
        console.error("Error hashing password:", error.message)
    }
})

// method to verify password
userSchema.methods.verifyPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.error("Error verifying password:", error.message)
        return false
    }
}

const User = mongoose.model("User", userSchema)

export default User