export const formatError = (error, models) => {
  if (error instanceof models.sequelize.ValidationError) {
    return error.errors.map((x) => ({ path: x.path, message: x.message }))
  }
  return [{ path: 'unknown', message: 'Something went wrong.' }]
}
