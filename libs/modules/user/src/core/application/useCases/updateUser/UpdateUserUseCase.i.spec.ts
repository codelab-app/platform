import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

describe.skip('UpdateUserUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  afterEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  it('should update user', async () => {
    const email = 'test_user@codelab.ai'
    const createUserMutation = `
			mutation {
			  createUser(user:
				{
				  email: "${email}",
				  password: "password"
				}) { id email}
			}`
    const createNewUser: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser.email).toEqual(email)
      })
    const newUserId = createNewUser.body.data.createUser.id
    const updateUserMutation = `
			mutation {
				updateUser(user: {id: "${newUserId}" email: "test_user_edited@gmail.com"}) { email }
			}
		`
    const updateUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: updateUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateUser.email).toEqual(
          'test_user_edited@gmail.com',
        )
      })
  })
  it('Should return an error when updating non-existent user', async () => {
    const email = 'test_user_edited@gmail.com'
    const updateUserMutation = `
			mutation {
				updateUser(user: {id: "93d12d99-0620-4c12-8a9d-be3aafeaf9f2" email: "${email}"}) { email }
			}
		`
    const updateNonExistentUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: updateUserMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email ${email} associated with any account`,
        )
      })
  })
})
