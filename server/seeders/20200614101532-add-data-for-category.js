  'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: '2D Traditional Painting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '2D Digital Painting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '3D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]

  return queryInterface.bulkInsert('Categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
