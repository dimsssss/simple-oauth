module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'pkce_record',
      {
        pkceRecordId: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        code: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        code_change: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        code_change_method: {
          type: Sequelize.DataTypes.STRING,
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
    return queryInterface.dropTable('pkce_record')
  },
}
