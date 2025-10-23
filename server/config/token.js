import jwt from 'jsonwebtoken'

// Generate a JWT token for a given user ID
const genToken = (id)=>{
    try{
        const token = jwt.sign({id},process.env.JWT_SECRET, {expiresIn: '30d'} )
        return token
    }catch(error){
        throw new Error("Token generation failed")
    }
}

export default genToken
 
