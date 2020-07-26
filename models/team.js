export default (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  })
  Team.associate = (models) => {
    Team.belongsToMany(models.User, {
      through: 'member',
      foreignKey: { name: 'teamId', field: 'team_id' },
    })
    Team.belongsTo(models.User, { foreignKey: 'owner' })
  }
  return Team
}
