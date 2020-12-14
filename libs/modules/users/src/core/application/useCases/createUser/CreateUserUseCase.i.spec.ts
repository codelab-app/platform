import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/users'

describe('CreateUserUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    // const connection = app.get(Connection)

    // await connection.close()
    await app.close()
  })

  it('should create a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
					mutation {
            createUser(user:
              {
                email: "admin@codelab.ai",
                password: "password"
              }
            ) {
							email
						}
					}
			  `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({ email: 'admin@codelab.ai' })
      })
  })

  // it('should raise an error given an existing email', async () => {
  //   await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `
  //         mutation {
  //           createUser(user:
  //             {
  //               email: "admin@codelab.com",
  //               password: "password"
  //             }
  //           ) {
  //             email
  //           }
  //         }
  //       `,
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.data.createUser).toEqual({ email: 'codelab@gmail.com' })
  //     })
  // })
})
