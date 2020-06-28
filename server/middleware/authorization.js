const { Commission, Progress, Work } = require('../models')

function commissionAuthorization(req, res, next) {

    Commission
        .findByPk(req.params.id)
        .then(data => {
            if (data) {
                if(data.id === req.LoginId) {
                    next();
                } else {
                    throw {
                        msg: 'You dont have authority to do this action',
                        code: 401
                    }
                }

            } else {
                throw {
                    msg: 'Commission not found',
                    code: 404
                }
            }
        })
        .catch(err => next(err))
}

// function supporterAuthorization(req, res, next) {

//     Supporter
//         .findByPk(req.params.id)
//         .then(data => {

//             //console.log(data)
//             // return results
//             if (data) {
//                     //let results = Object.assign(data)
//                     //console.log(results)
//                     next()

//             } else {

//                 res.status(404).json({
//                     error: 'not found'
//                 })
//             }

//         })
//     .catch(err => next(err))
// }

function workAuthorization(req, res, next) {

    Work
        .findByPk(req.params.id)
        .then(data => {
            if (data) {
                if(data.id === req.LoginId) {
                    next();
                } else {
                    throw {
                        msg: 'You dont have authority to do this action',
                        code: 401
                    }
                }

            } else {
                throw {
                    msg: 'Portofolio not found',
                    code: 404
                }
            }
        })
    .catch(err => next(err))
}

function progressAuthorization(req, res, next) {

    Progress
        .findByPk(req.params.id)
        .then(project => {
            if(project) {
                if (project.ClientId === req.LoginId) {
                    next();
                } else {
                    throw {
                        msg: 'You dont have authority to do this action',
                        code: 401
                    }
                }
            } else {
                throw {
                    msg: 'Project not found',
                    code: 404
                }
            }
        })
        .catch(err => {
            next(err);
        })
}


module.exports = {commissionAuthorization, workAuthorization, progressAuthorization}