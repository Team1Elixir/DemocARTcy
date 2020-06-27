const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')
function authentication(req,res,next){
    let token = req.headers.token
    try{
        if(token){
            let decodeid = verifyToken(token);
            let {id, username} = decodeid;
            
            User
                .findByPk(id)
                .then(data => {
                    if(data && data.username === username){
                        req.LoginId = data.id
                        next()
                    }else{
                        res.status(401).json({
                            error : 'authentication data invalid, please login again'
                        })
                    }
                })
                .catch(err => {
                    next(err);
                })

        } else {
            res.status(401).json({
                error : 'please login first'
            })
        }
    }
    catch (err){
        next(err)
    }
}

module.exports = authentication