'use strict';
module.exports = (sequelize, DataTypes) => {

  class Category extends sequelize.Sequelize.Model{}

  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category'
  });
  Category.associate = function(models) {

  };
  return Category;
};