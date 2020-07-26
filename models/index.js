import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('slack-clone', 'postgres', '_sn0r13xpl', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
})

const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
}

Object.keys(models).forEach((model) => {
  if ('associate' in models[model]) {
    models[model].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
