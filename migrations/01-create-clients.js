module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'clients',
      {
        clientId: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        secret: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        grantType: {
          type: Sequelize.DataTypes.ENUM,
          values: ['authorization_code'],
          allowNull: false,
        },

        createdAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    )
  },
  down: queryInterface => {
    return queryInterface.dropTable('clients')
  },
}
