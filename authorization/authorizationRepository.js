const db = require('../bin/database')
const DatabaseException = require('./exception/DatabaseException')
const NotFoundClientException = require('./exception/NotFoundClientException')
const {sequelize} = db

const createCode = async (clientId, pkceCode) => {
  return await sequelize
    .transaction(async transaction => {
      const {pkceRecord, clients} = db

      const client = await clients.findByPk(clientId, {
        raw: true,
        transaction,
      })

      if (client === null) {
        throw new NotFoundClientException(clientId)
      }
      return await pkceRecord.create(pkceCode, {raw: true, transaction})
    })
    .catch(err => {
      if (err instanceof NotFoundClientException) {
        throw err
      }
      throw new DatabaseException(err)
    })
}

const findByCodeAndClientId = async condition => {
  const {pkceRecord} = db
  return await pkceRecord.findOne({
    where: {clientId: condition.clientId, code: condition.code},
    raw: true,
  })
}

module.exports = {
  createCode,
  findByCodeAndClientId,
}
