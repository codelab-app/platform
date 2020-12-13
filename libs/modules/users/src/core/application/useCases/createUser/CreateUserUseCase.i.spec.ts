import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/users'

describe.skip('Create User E2E test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const m = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = m.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create user', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
					mutation {
						createUser(user: { email: "codelab@gmail.com", password: "1234" }) 
                        {
							email
						}
					}
			`,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({ email: 'codelab@gmail.com' })
      })
  })
})
