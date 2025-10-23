import Session from '../models/session.model.js'

// Create new session
export const startSession = async(req, res)=>{
    try{
        const session = await Session.create({
            userId: req.user._id,
            category: req.body.category || 'general',
            startTime: new Date(),
        })

        res.status(201).json(session)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

// End the session
export const endSession = async(req, res)=>{
    try{
        const sessionId = req.body.sessionId

        // Find the session by ID
        const session = await Session.findById(sessionId)

        if(!session){
            return res.status(404).json({message: "Session not found"})
        }

        // Update endTime and calculate duration 
        session.endTime = new Date()
        session.duration = Math.round((session.endTime - session.startTime)/60000) // duration in minutes
        await session.save()

        res.json(session)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

// Get session statistics for the user using aggregation
export const getStats = async(req,res)=>{
    try {
        const stats = await Session.aggregate([
            {$match : {userId: req.user._id}},
            {
                $group:{
                    _id : "$category",
                    totalMinutes: {$sum: "$duration"},
                    count: {$sum: 1}
                }
            }
        ])

        res.json(stats)
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

// Get all sessions for the user
export const getAllSessions = async(req, res)=>{
    try{
        const sessions = await Session.find({userId: req.user._id}).sort({startTime: -1})
        if(!sessions){
            return res.status(404).json({message: "No sessions found"})
        }
        res.json(sessions)
    }catch (error){
        res.status(500).json({error: error.message})
    }
}