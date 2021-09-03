import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return and account on success', async () => {
    await request(app)
      .post('/api/signup')
      .accept('application/json')
      .responseType('application/json')
      .type('application/json')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Ailton Nunes',
        email: 'nunes.tom@gmail.com',
        password: '123456789',
        passwordConfirmation: '123456798'
      })
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
