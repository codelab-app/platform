import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import {
  createTestApp,
  createTestUser,
  setupStyleTestModule,
} from '../../testUtils'
import { request, teardownTestModule } from '@codelab/backend'
import { CreateStyleGql } from '@codelab/generated'
import { App } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

describe('CreateStyleUseCase', () => {
  let nestApp: INestApplication
  let user: User

  const createStyle = (
    props: object,
    appId: string,
    name = 'Test style',
    accessToken = user.accessToken,
  ) => {
    return request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreateStyleGql),
        variables: { input: { props, appId, name } },
      })
      .expect(200)
  }

  beforeAll(async () => {
    nestApp = await setupStyleTestModule(nestApp)
    user = await createTestUser(nestApp)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should return error for wrong app id', async () => {
    const wrongAppId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await createStyle({ color: 'red' }, wrongAppId, 'Test style 1').expect(
      (res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The app with id ${wrongAppId} has not been found`,
        )
      },
    )
  })

  it('should create a style', async () => {
    const createApp: App = await createTestApp(nestApp, user.accessToken)

    const { id: appId } = createApp

    await createStyle({ background: 'azure' }, appId, 'Test style 2').expect(
      (res) => {
        expect(res.body.data.createStyle.id).toBeTruthy()
        expect(res.body.data.createStyle.name).toBe('Test style 2')
      },
    )
  })
})
