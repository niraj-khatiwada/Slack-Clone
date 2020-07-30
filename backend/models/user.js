import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [5, 20],
            msg: 'Username must be at least 5 characters long.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: 'Invalid email.' },
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 100],
            message: "Password can't be less than 6 characters",
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10)
        },
      },
    }
  )

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: { name: 'userId', field: 'user_id' },
    })
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    })
  }
  return User
}
