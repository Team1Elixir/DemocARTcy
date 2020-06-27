"use strict";
module.exports = (sequelize, DataTypes) => {
  class Commission extends sequelize.Sequelize.Model {}

  Commission.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Title is required" },
          notEmpty: { args: true, msg: "Title is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Price is required" },
          notEmpty: { args: true, msg: "Price is required" },
          isInt: { args: true, msg: 'Price must be a number'},
        },
      },
      sample_img: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {args: true, msg: 'Sample Image is required' },
          notEmpty: { args: true, msg: 'Sample image is required' },
          isUrl: {args : true, msg:'Invalid Url format'}
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Category is required" },
          notEmpty: { args: true, msg: "Category is required" },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Commission",
    }
  );
  Commission.associate = function(models) {
    Commission.belongsTo(models.User);
  };
  return Commission;
};
