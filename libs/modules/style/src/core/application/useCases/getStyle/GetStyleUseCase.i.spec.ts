import { INestApplication } from '@nestjs/common'
import {
  createTestApp,
  createTestStyle,
  createTestUser,
  getStyle,
  setupStyleTestModule,
} from '../../testUtils'
import { teardownTestModule } from '@codelab/backend'
import { App } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

describe('GetStylesUseCase', () => {
  let nestApp: INestApplication
  let user: User

  beforeAll(async () => {
    nestApp = await setupStyleTestModule(nestApp)
    user = await createTestUser(nestApp)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should not get styles for guest user', async () => {
    const randomId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await getStyle(nestApp, randomId, '').then((res) => {
      expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
    })
  })

  it('should retrieve style by id', async () => {
    const app: App = await createTestApp(
      nestApp,
      user.accessToken,
      'Test app 1',
    )

    const style = await createTestStyle(
      nestApp,
      app.id,
      {
        color: 'red',
      },
      user.accessToken,
    )

    await getStyle(nestApp, style.id, user.accessToken).expect((res) => {
      expect(res.body.data.getStyle.id).toEqual(style.id)
    })
  })

  it('should get an error  for non-existing style', async () => {
    const randomStyleId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await getStyle(nestApp, randomStyleId, user.accessToken).expect((res) => {
      expect(res.body.errors[0].message).toBe(
        `The style with id ${randomStyleId} has not been found`,
      )
    })
  })
})
