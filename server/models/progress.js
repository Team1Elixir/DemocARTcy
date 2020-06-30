'use strict';
module.exports = (sequelize, DataTypes) => {

  class Progress extends sequelize.Sequelize.Model{}

  Progress.init( {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required'
        },
        notNull: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'onProgress',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is required'
        },
        notNull: {
          args: true,
          msg: 'Status is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        isInt: {
          args: true,
          msg: 'Price must be a number'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://bit.ly/3iendMh',
      validate: {
        notNull: {args: true, msg: 'Sample Image is required' },
        notEmpty: { args: true, msg: 'Sample image is required' },
        isUrl: {args : true, msg:'Invalid Url format'}
      }
    },
    ClientId: {
      type : DataTypes.INTEGER,
      references: {
        model: "Users",
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    ArtistId: {
      type : DataTypes.INTEGER,
      references: {
        model: "Users",
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    }
  },{
    sequelize,
    modelName: 'Progress',
    hooks: {
      beforeCreate(project) {
        const { ArtistId, ClientId } = project;
        if(ArtistId == ClientId) {
          console.log('error')
          throw({
            msg: `You cant apply for your own commission`,
            code: 400
          })
        }
      }
    }
  });
  Progress.associate = function(models) {
    Progress.belongsTo(models.User, { as: 'client', foreignKey: 'ClientId' });
    Progress.belongsTo(models.User, { as: 'artist', foreignKey: 'ArtistId' });
  };
  return Progress;
};  