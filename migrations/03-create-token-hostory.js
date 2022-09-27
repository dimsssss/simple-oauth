module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        'token_history',
        {
          tokenHistoryId: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          groupId: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
          },
          clientId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          accessToken: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          refreshToken: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          isUsed: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
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
      .then(() => {
        queryInterface.addIndex('token_history', ['groupId'])
      })
  },
  down: queryInterface => {
    return queryInterface.dropTable('token_history')
  },
}
