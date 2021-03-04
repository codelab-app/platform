import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import {
  createTestApp,
  createTestStyle,
  createTestUser,
  setupStyleTestModule,
} from '../../testUtils'
import { request, teardownTestModule } from '@codelab/backend'
import { GetStylesGql } from '@codelab/generated'
import { App } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

describe('GetStylesUseCase', () => {
  let nestApp: INestApplication
  let user: User

  const getStyles = (appId: string, accessToken = user.accessToken) => {
    return request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetStylesGql),
        variables: {
          input: {
            appId,
          },
        },
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

  it('should not get styles for guest user', async () => {
    const randomAppId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await getStyles(randomAppId, '').then((res) => {
      expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
    })
  })

  it('should retrieve styles for app', async () => {
    const app: App = await createTestApp(
      nestApp,
      user.accessToken,
      'Test app 1',
    )
    const app2: App = await createTestApp(
      nestApp,
      user.accessToken,
      'Test app 2',
    )

    await createTestStyle(
      nestApp,
      app.id,
      {
        color: 'red',
      },
      user.accessToken,
    )

    await createTestStyle(
      nestApp,
      app.id,
      {
        fontWeight: '500',
      },
      user.accessToken,
    )

    // We should not get this one, it's for app2
    await createTestStyle(
      nestApp,
      app2.id,
      {
        fontWeight: '500',
      },
      user.accessToken,
    )

    await getStyles(app.id).expect((res) => {
      expect(res.body.data.getStyles.length).toEqual(2)
    })
  })
})
