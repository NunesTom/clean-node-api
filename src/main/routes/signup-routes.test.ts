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
    const accontCollection = MongoHelper.getCollection('accounts')
    await accontCollection.deleteMany({})
  })

  test('Should return and account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Ailton Nunes',
        email: 'nunes.tom@gmail.com',
        password: '123456789',
        passwordConfirmation: '123456798'
      })
      .expect(200)
  })
})
