import mongoose from 'mongoose'

// Define Session schema
const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: String,
        default: 'general'
    },
    duration:{
        type: Number // in minutes
    },
    startTime:{
        type: Date,
    },
    endTime:{
        type: Date
    }

})

const Session = mongoose.model('Session', sessionSchema)

export default Session