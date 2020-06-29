const { Work, User } = require("../models");

class WorkController {

  //LIST WORKS
  static mylist(req, res, next) {
    Work.findAll({ where: { UserId: req.LoginId }, include: [User] })
      .then(data => {
        res.status(200).json({
          works: data
        });
      })
      .catch(err => {
        next(err);
      });
  }

  static getArtistWork (req, res, next) {
    const UserId = req.params.id;

    Work
      .findAll({
        where: {
          UserId
        }
      })
      .then(data => {
        res.status(200).json({
          works: data
        })
      })
      .catch(err => {
        next(err);
      });
  }

  //GET ALL WORKS
  static getAllWorks(req, res, next) {
    Work.findAll({
      include: [User]
    })
    .then(data => {
      res.status(200).json({
        works: data
      })
    })
    .catch(err => {
      next(err);
    })
  }

  //ADD WORK
  static add(req, res, next) {
    let { image_url, title, description, category } = req.body;

    Work.create({ image_url, title, description, category, UserId: req.LoginId })
      .then(data => {
        res.status(201).json({
          work: data,
        });
      })
      .catch(err => {
        console.log(err.message)
        next(err);
      });
  }

  //SELECT WORK
  static select(req, res, next) {
    Work.findByPk(req.params.id, {include: [User]})
      .then(data => {
        if(data) {
          res.status(200).json({
              work: data
          })
        } else {
            throw {
                msg: 'No portofolio is found',
                code: 404
            }
        } 
      })
      .catch(err => {
        next(err);
      });
  }

  //EDIT WORK
  static edit(req, res, next) {
    let { image_url, title, description, category } = req.body;

    Work.update(
      { image_url, title, description, category },
      { where: { id: req.params.id }, returning: true }
    )
      .then(data => {
        res.status(200).json({
          work: data[1][0]
        })
      })
      .catch(err => {
        next(err);
      });
  }

  //DELETE WORK
  static delete(req, res, next) {
    const { id } = req.params;

    Work.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({
          message: `Success delete portofolio with id ${id}`
        })
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = WorkController;
