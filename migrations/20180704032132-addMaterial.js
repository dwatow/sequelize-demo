'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('material', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' }
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
