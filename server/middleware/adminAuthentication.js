const {verifyToken} = require('../helpers/jwt')
const {Admin} = require('../models')
function adminAuthentication(req,res,next){
    // console.log(req.headers.token)
    let token = req.headers.token
    try{
        if(token){
            // console.log('liu')
            let decodeid = verifyToken(token)
            // console.log(decodeid)
            let {id,username} = decodeid
            
            Admin
                .findByPk(id)
                .then(data => {
                    if(data.username === username){
                        // console.log(data)
                        req.LoginId = data.id
                        next()
                    }else{
                        req.status(401).json({
                            err : 'authentication data invalid, please login again'
                        })
                    }
                })
                .catch(err => {
                    res.status(401).json({
                        err : 'authentication error, please login again'
                    })
                })

        }else{
            res.status(401).json({
                err : 'please login first'
            })
        }
    }
    catch (err){
        next(err)
    }
}

module.exports = adminAuthentication