const { Commission, User } = require('../models')

class CommissionController{

    //LIST OWN COMMISSION
    static mylist (req,res,next){
        Commission
            .findAll({where:{UserId: req.LoginId}, include: [User]})
            .then(data => {
                res.status(200).json({
                    commissions: data
                })
            })
            .catch(err => {
                next(err);
            })
    }

    //GET ALL COMMISSIONS
    static getAllCommissions(req, res, next) {
        Commission
            .findAll({
            include: [User]
            })
            .then(data => {
            res.status(200).json({
                commissions: data
            })
            })
            .catch(err => {
              next(err);
            })
      }


    //ADD COMMISSION
    static add (req,res,next){

        let { title, price, image_url, category, description } = req.body

        Commission
            .create({ title, price, image_url, category, description, UserId: req.LoginId })
            .then(data => {
                res.status(201).json({
                    commission: data
                })
            })
            .catch(err => {
                console.log(err.message)
                next(err);
            })
    }

    //SELECT COMMISSION
    static select (req,res,next){

        Commission
            .findOne({where: {id: req.params.id}, include: [User]})
            .then(data => {
                if(data) {
                    res.status(200).json({
                        commission: data
                    })
                } else {
                    throw {
                        msg: 'No commission is found',
                        code: 404
                    }
                }
            })
            .catch(err => {
                next(err);
            })

    }

    //EDIT COMMISSION
    static edit (req,res,next){
        let { title, price, image_url, category, description } = req.body

        Commission
            .update({ title, price, image_url, category, description}, {where: { id: req.params.id }, returning: true})
            .then(data => {
                res.status(200).json({
                    commission: data[1][0]
                })
            })
            .catch(err => {
                next(err);
            })
    }

    //DELETE COMMISSION
    static delete (req,res,next){
        const { id } = req.params;

        Commission
        .destroy({where: { id }})
            .then(() => {
                res.status(200).json({
                    message: `Success delete commission with id ${id}`
                })
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = CommissionController