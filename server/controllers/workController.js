const { Work } = require("../models");

class WorkController {

  //LIST WORKS
  static mylist(req, res, next) {
    Work.findAll({ where: { UserId: req.LoginId } })
      .then(data => {
        res.status(200).json({
          works: data
        });
      })
      .catch(err => {
        next(err);
      });
  }

  //ADD WORK
  static add(req, res, next) {
    let { image_url, title, story, category } = req.body;

    Work.create({ image_url, title, story, category, UserId: req.LoginId })
      .then(data => {
        res.status(201).json({
          work: data,
        });
      })
      .catch(err => {
        next(err);
      });
  }

  //SELECT WORK
  static select(req, res, next) {
    Work.findByPk(req.params.id)
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
    let { image_url, title, story, category } = req.body;

    Work.update(
      { image_url, title, story, category },
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
