'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const p2 = queryInterface.addColumn('Commissions', 'UserId', {
      type : Sequelize.INTEGER,
      foreignKey : true,
      references: {
        model: "Users",
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    })

    return Promise.all([p2])
  },

  down: (queryInterface, Sequelize) => {
    const p2 = queryInterface.removeColumn('Commisions', 'UserId')

    return Promise.all([p2])
  }
};
