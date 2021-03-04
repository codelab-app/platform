import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import {
  createTestApp,
  createTestStyle,
  createTestUser,
  setupStyleTestModule,
} from '../../testUtils'
import { request, teardownTestModule } from '@codelab/backend'
import { DeleteStyleGql, Style } from '@codelab/generated'
import { App } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

describe('DeleteStyleUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let app: App
  let style: Style

  const deleteStyle = (
    styleId: string = style.id,
    accessToken = user.accessToken,
  ) => {
    return request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(DeleteStyleGql),
        variables: {
          input: { styleId },
        },
      })
      .expect(200)
  }

  beforeAll(async () => {
    nestApp = await setupStyleTestModule(nestApp)
    user = await createTestUser(nestApp)
    app = await createTestApp(nestApp, user.accessToken)
  })

  beforeEach(async () => {
    style = await createTestStyle(
      nestApp,
      app.id,
      {
        background: 'azure',
      },
      user.accessToken,
      'Test style',
    )
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should delete existing style', async () => {
    await deleteStyle().expect((res) => {
      console.log(res.body)
      expect(res.body.data.deleteStyle.id).toEqual(style.id)
      expect(res.body.data.deleteStyle.name).toEqual(style.name)
    })
  })

  it('should not delete style for guest user', async () => {
    const randomStyleId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await deleteStyle(randomStyleId, '').then((res) => {
      expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
    })
  })

  it('should return error for wrong style id', async () => {
    const wrongStyleId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await deleteStyle(wrongStyleId)
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Cannot delete style`)
      })
  })
})
