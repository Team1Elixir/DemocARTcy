'use strict';
module.exports = (sequelize, DataTypes) => {

  class Work extends sequelize.Sequelize.Model{}

  Work.init({
    image_url: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Image url is required'
        },
        notEmpty: {
          args: true,
          msg: 'Image url is required'
        },
        isUrl: {
          args: true,
          msg: 'Invalid url format'
        }
      }
    },
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title is required'
        },
        notEmpty: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    story: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description is required'
        },
        notEmpty: {
          args: true,
          msg: 'Description is required'
        }
      }
    },
    category: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Category is required'
        },
        notEmpty: {
          args: true,
          msg: 'Category is required'
        }
      }
    },
    UserId: {
      type : DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Work'
  });
  Work.associate = function(models) {
    Work.belongsTo(models.User)
  };
  return Work;
};