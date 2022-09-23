module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define(
    'clients',
    {
      clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      secret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      grantType: {
        type: DataTypes.ENUM,
        values: ['authorization_code'],
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        onUpdate: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      paronId: true,
    },
  )

  return clients
}
