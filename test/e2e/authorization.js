/* global describe it */
const request = require('supertest')
const app = require('../../app')
const assert = require('assert')
const db = require('../../bin/database')
const {before, after} = require('mocha')

describe('Oauth Service e2e 테스트', () => {
  before(async () => {
    const {clients} = db
    await clients.create({secret: 'secret', grantType: 'authorization_code'})
  })
  after(async () => {
    const {clients, pkceRecord} = db
    await clients.destroy({where: {}, force: true, truncate: true})
    await pkceRecord.destroy({where: {}, force: true, truncate: true})
  })
  // 코드 발행
  it('POST /authorization/code', async () => {
    const response = await request(app)
      .post('/authorization/code')
      .send({
        clientId: 1,
        grantType: 'authorization_code',
        redirectUrl: 'https://simple-oauth/',
        codeChallenge: '0c2823f6faee9eb477c908e2cbd1ceb716b9a8a2f9087551c0ea74310ecfc228',
        codeChallengeMethod: 'sha256',
      })
      .set('Accept', 'application/json')

    assert.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    assert.equal(response.statusCode, 201)
    assert.equal(response._body.code.length, 36)
  })

  it('POST /authorization/token 성공시 토큰 정보와 status code 201을 반환한다', async () => {
    const codeInformation = await db.pkceRecord.findOne({where: {clientId: 1}, raw: true})
    const response = await request(app)
      .post('/authorization/token')
      .send({
        clientId: 1,
        grantType: 'authorization_code',
        redirectUrl: 'https://simple-oauth/',
        codeVerifier: 'MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTE=',
        code: codeInformation.code,
      })
      .set('Accept', 'application/json')

    assert.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    assert.equal(response.statusCode, 201)
  })

  it('POST /authorization/token clientId가 유효하지 않을 때 400에러를 반환한다', async () => {
    const response = await request(app)
      .post('/authorization/token')
      .send({
        clientId: 0,
        grantType: 'authorization_code',
        redirectUrl: 'https://simple-oauth/',
        codeVerifier: '860898ab8239a80ea3249059ee248c69059730a4018e4e4c421da12235b3ec0d',
      })
      .set('Accept', 'application/json')

    assert.equal(response.headers['content-type'], 'text/html; charset=utf-8')
    assert.equal(response.statusCode, 400)
  })

  it('POST /authorization/token verifier가 유효하지 않을 때 400에러를 반환한다', async () => {
    const response = await request(app)
      .post('/authorization/token')
      .send({
        clientId: 1,
        grantType: 'authorization_code',
        redirectUrl: 'https://simple-oauth/',
        codeVerifier: 'asds',
      })
      .set('Accept', 'application/json')

    assert.equal(response.headers['content-type'], 'text/html; charset=utf-8')
    assert.equal(response.statusCode, 400)
  })
})
