const db = require('../bin/database')
const DatabaseException = require('./exception/DatabaseException')
const NotFoundClientException = require('./exception/NotFoundClientException')
const {sequelize, Sequelize} = db

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

const createTokenHistory = async history => {
  try {
    const {tokenHistory} = db
    return await tokenHistory.create(history, {
      raw: true,
    })
  } catch (err) {
    throw new Error(err)
  }
}

const findByCodeAndClientId = async condition => {
  const {pkceRecord} = db
  return await pkceRecord.findOne({
    where: {clientId: condition.clientId, code: condition.code},
    raw: true,
  })
}

const findDisabledRefeshToken = async tokenInformation => {
  try {
    const {tokenHistory} = db
    return await tokenHistory.findOne({
      where: {
        refreshToken: tokenInformation.refreshToken,
        isUsed: false,
      },
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const disableAllRefreshTokenFor = async tokenInformation => {
  try {
    const {tokenHistory} = db
    return await tokenHistory.update(
      {isUsed: false},
      {
        where: {
          groupId: Sequelize.literal(
            `(SELECT groupId FROM token_history WHERE refreshToken = ${tokenInformation.refreshToken})`,
          ),
        },
      },
    )
  } catch (err) {
    throw new Error(err)
  }
}

const disableRefreshToken = async tokenInformation => {
  try {
    const {tokenHistory} = db
    return await tokenHistory.update(
      {isUsed: false},
      {
        where: {
          refreshToken: tokenInformation.refreshToken,
        },
      },
    )
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createCode,
  findByCodeAndClientId,
  createTokenHistory,
  findDisabledRefeshToken,
  disableAllRefreshTokenFor,
  disableRefreshToken,
}
