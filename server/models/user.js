'use strict';

const { encrypt } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model{}

  User.init({
    name: {type : DataTypes.STRING},
    username: {
      type : DataTypes.STRING,
      alllowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'username is required'
        }
      }
    },
    email: {type : DataTypes.STRING, 
      unique: {
        args: true,
        msg: 'email already exists'
      },
      validate: {
        isEmail:{
          args: true,
          msg: 'please input correct email'
        },
        notEmpty: {
          args: true,
          msg: 'email already exists'
        }
      }},
    password: {type : DataTypes.STRING, 
      validate: {
        len: {args: [6], msg: 'password must more than 6 letters'}
    }},
    cover_url: {type : DataTypes.STRING},
    profile_url: {type : DataTypes.STRING},
    bio: {type : DataTypes.STRING},
    website: {type : DataTypes.STRING},
    ban: {type : DataTypes.BOOLEAN}
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterValidate:(user) => {
          let newPassword = encrypt(user.password)
          user.password = newPassword
      }
     
    },
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Commission)
    User.hasMany(models.Work)
    User.hasMany(models.Progress, { foreignKey: 'ClientId' })
    User.hasMany(models.Progress, { foreignKey: 'ArtistId' })
  };
  return User;
};