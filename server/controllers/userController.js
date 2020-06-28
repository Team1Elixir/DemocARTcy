const {User,Work,Supporter,Commission} = require('../models')
const {encrypt, compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {

    //SELECT USER
    static select (req,res,next){
      User
        .findOne({where: {username: req.params.username}})
        .then(data => {
          if (data) {
            res.status(200).json({
              id: data.id,
              name: data.name,
              username: data.username,
              email: data.email,
              cover_url: data.cover_url,
              profile_url: data.profile_url,
              bio: data.bio,
              website: data.website
            })
          } else {
            throw {
              msg: 'Username not found',
              code: 404
            }
          }
        })
        .catch(err => {
          next(err);
        })
    }

    //LOGIN USER ACCOUNT
    static login (req,res,next){
        User
          .findOne({where: {username: req.body.username}, attributes: { include: ['password']}})
          .then(data => {
            if(data) {
              if(compare(req.body.password, data.password)){
                if(data.ban == false){
                  res.status(200).json({
                    token: generateToken({
                      id:data.id,
                      username:data.username
                    }),
                    username: data.username
                  })
                }else{
                  res.status(400).json({
                    message: `your account has been banned.`
                  })
                }
              }else{
                  throw {
                    code: 400,
                    msg: 'password is invalid'
                  }
              }
            } else {
              throw {
                code: 400,
                msg: 'username is invalid or not found'
              }
            }
            
          })
          .catch(err => {
              next(err);
          })
    }


    //REGISTER USER ACCOUNT
    static register (req,res,next){
        let {username,email,password} = req.body
        let name = username
        let payload = {
          name, 
          username, 
          email, 
          password, 
          ban: false
        }
        console.log(payload)
        User
            .create(payload)
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    ban: data.ban
                })
            })
            .catch(err => {
              console.log(err)
                next(err);
            })
    }

    //EDIT USER ACCOUNT
    static edit (req,res,next) {
      console.log('edit through here')
      let{ email, cover_url, profile_url, bio, website, name } = req.body
      const id  = +req.params.id;
      console.log(id, email, cover_url, profile_url, bio, website, name)
      const payload = { email, cover_url,profile_url, bio, website, name }
      User
        .update(payload, {where: { id }})
        .then(data => {
          console.log('keedit')
          res.status(200).json({
            data
          })
        })
        .catch(err => {
          console.log(err)
          next(err)
        })
    }

    // static googleLogin (req,res,next){
    //     let google_token = req.headers.google_token;
    //     let email = null;
    //     let newUser = false;
    //     let first_name = null;
    //     let last_name = null
    //     googleVerification(google_token)
    //       .then(payload => {
    //         email = payload.email;
    //         first_name = payload.given_name;
    //         last_name = payload.family_name;
    //         return User
    //           .findOne({
    //             where: {
    //               email
    //             }
    //           })
    //       })
    //       .then(user => {
    //         if (user) {
    //           return user;
    //         } else {
    //           newUser = true;
  
    //           return User
    //             .create({
    //               first_name,
    //               last_name,
    //               email,
    //               password: process.env.DEFAULT_GOOGLE_PASSWORD
    //             });
    //         }
    //       })
    //       .then(user => {
    //         let code = newUser ? 201 : 200;
  
    //         io.emit('log',`${user.first_name} has loggedIn`)
    //         res.status(code).json({
    //           token: generateToken({
    //             data: {
    //               id: user.id,
    //               email: user.email
    //             }
    //           })
    //         });
    //       })
    //       .catch(err => {
    //         next(err);
    //       })
    // }
}

module.exports = UserController;
