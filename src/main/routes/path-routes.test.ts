import app from '@/main/config/app'
import request from 'supertest'

describe('Path Routes', () => {
  test('should return 200 on call path /api', async () => {
    await request(app)
      .get('/api')
      .expect(200)
  })
})
