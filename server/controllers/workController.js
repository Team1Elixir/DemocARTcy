const { Work, User } = require("../models");

class WorkController {

  //LIST WORKS
  static all (req, res, next) {
    console.log('kesini get all works')
    Work.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static mylist(req, res, next) {
    console.log('my list',req.LoginId)
    Work.findAll({ where: { UserId: req.LoginId } })
      .then(data => {
        res.status(200).json(
          data
        );
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
    Work.findOne({ where: {id: req.params.id}, include: [{
      model: User, as: 'User'
    }]})
      .then(data => {
        if(data) {
          console.log(data)
          
          res.status(200).json({
            id: data.id,
            image_url: data.image_url,
            category: data.category,
            UserId: data.UserId,
            username: data.User.username,
            story: data.story,
            title: data.title  
          })
        } else {
            throw {
                msg: 'No portofolio is found',
                code: 404
            }
        } 
      })
      .catch(err => {
        console.log(err)
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
