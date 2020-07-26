export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: { name: 'userId', field: 'user_id' },
    })
    Message.belongsTo(models.Channel, {
      foreignKey: { name: 'channelId', field: 'channel_id' },
    })
  }
  return Message
}
