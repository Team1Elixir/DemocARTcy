const { Commission, User } = require('../models')

class CommissionController{

    //LIST OWN COMMISSION
    static mylist (req,res,next){
        Commission
            .findAll({where:{UserId: req.params.id}, include: [User]})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err);
            })
    }

    //GET ALL COMMISSIONS
    static getAllCommissions(req, res, next) {
        console.log('sampe di get all coms')
        Commission
            .findAll()
            .then(data => {
                console.log('dapet data')
                console.log(data)
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
              next(err);
            })
      }


    //ADD COMMISSION
    static add (req,res,next){

        let { title, price, sample_img, category, description } = req.body

        Commission
            .create({ title, price, sample_img: sample_img, category, description, UserId: req.LoginId })
            .then(data => {
                res.status(201).json(data)
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
                    console.log(data)
                    res.status(200).json({
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    sample_img: data.sample_img,
                    category: data.category,
                    description: data.description,
                    username: data.User.username,
                    UserId: data.UserId
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
        let { title, price, sample_img, category, description } = req.body

        Commission
            .update({ title, price, sample_img, category, description}, {where: { id: req.params.id }, returning: true})
            .then(data => {
                res.status(200).json(
                    data[1][0]
                )
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