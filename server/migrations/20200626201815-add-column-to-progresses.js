'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const p1 = queryInterface.addColumn('Progresses', 'ClientId', {
      type : Sequelize.INTEGER,
      foreignKey : true,
      references: {
        model: "Users",
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    })
    const p2 = queryInterface.addColumn('Progresses', 'ArtistId', {
      type : Sequelize.INTEGER,
      foreignKey : true,
      references: {
        model: "Users",
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    })

    return Promise.all([p1,p2])
  },

  down: (queryInterface, Sequelize) => {
    const p1 = queryInterface.removeColumn('Users', 'ClientId')
    const p2 = queryInterface.removeColumn('Users', 'ArtistId')

    return Promise.all([p1,p2])
  }
};
