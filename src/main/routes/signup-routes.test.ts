import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
