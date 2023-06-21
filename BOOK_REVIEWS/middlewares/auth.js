const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    // console.log("inside middleware")
    // console.log(req.headers)

    let token = req.headers.authorization
    if(!token) return res.status(401).json({error: 'auth token not present'})
    // console.log(token)
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, payload) =>{
        if(err) return res.status(500).json({error: err.message})
        // console.log(payload)
        req.user = payload
        console.log(req.user)    
    }) 
    next()
}

const verifyAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({error: 'you are not admin!'})
    }
    else if (req.user.role === 'admin'){
        next()
    }
}
module.exports = { verifyUser, verifyAdmin }