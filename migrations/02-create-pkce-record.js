module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        'pkce_record',
        {
          pkceRecordId: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
          },
          clientId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          code: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          codeChallenge: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          codeChallengeMethod: {
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
      .then(() => {
        queryInterface.addIndex('pkce_record', ['clientId'])
      })
  },
  down: queryInterface => {
    return queryInterface.dropTable('pkce_record')
  },
}
