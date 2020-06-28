const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')
function authentication(req,res,next){
    let token = req.headers.token
    try{
        let decodeid = verifyToken(token);
        let {id, username} = decodeid;
        
        User
            .findByPk(id)
            .then(data => {
                if(data && data.username === username){
                    req.LoginId = data.id
                    next()
                }else{
                    throw {
                        msg: 'authentication data invalid, please login again',
                        code: 401
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }
    catch (err){
        next(err)
    }
}

module.exports = authentication