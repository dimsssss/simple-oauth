/* global describe it */
const request = require('supertest')
const app = require('../../app')
const assert = require('assert')

describe('Oauth Service e2e 테스트', () => {
  // 코드 발행
  it('POST /authorization/code', async () => {
    const response = await request(app)
      .post('/authorization/code')
      .send({
        clientId: 1,
        grantType: 'authorization_code',
        redirectUrl: 'https://simple-oauth/',
        codeChallenge:
          '860898ab8239a80ea3249059ee248c69059730a4018e4e4c421da12235b3ec0d',
        codeChallengeMethod: 'sha256',
      })
      .set('Accept', 'application/json')

    assert.equal(
      response.headers['content-type'],
      'application/json; charset=utf-8',
    )
    assert.equal(response.statusCode, 201)
    assert.equal(response._body.code.length, 36)
  })
})
