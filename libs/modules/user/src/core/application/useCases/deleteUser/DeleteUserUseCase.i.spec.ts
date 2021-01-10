import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

describe.skip('DeleteUserUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()
  })

  afterAll(async () => {
    await connection.synchronize(true)
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.synchronize(true)
  })

  it('should delete an existing user', async () => {
    const email = 'test_user@codelab.ai'

    const createUserMutation = `
			mutation {
			  registerUser(input:
				{
				  email: "${email}",
				  password: "password"
				}) { email}
			}`
    const deleteUserMutation = `mutation {
			deleteUser(input: {email: "${email}"}) { email }
		}`

    const createNewUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.registerUser).toEqual({
          email: 'test_user@codelab.ai',
        })
      })
    const deleteExistingUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteUser).toEqual({
          email: 'test_user@codelab.ai',
        })
      })
  })

  it('Should return error when deleting non-existent user', async () => {
    const email = 'test_user@codelab.ai'
    const deleteUserMutation = `mutation {
			deleteUser(input: {email: "${email}"}) { email }
		}`
    const deleteNonExistentUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteUserMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email ${email} associated with any account`,
        )
      })
  })

  // it('should', () => {
  //   expect(true).toBeTruthy()
  // })
})
