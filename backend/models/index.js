import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

const env = config()

const sequelize = new Sequelize(process.env.URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  define: {
    underscored: true,
  },
  port: 5432,
  logging: console.log,
  host: process.env.HOST,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
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
