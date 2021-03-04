import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import {
  createTestApp,
  createTestStyle,
  createTestUser,
  getStyle,
  setupStyleTestModule,
} from '../../testUtils'
import { request, teardownTestModule } from '@codelab/backend'
import { App, Style, UpdateStyleGql } from '@codelab/generated'
import { User } from '@codelab/modules/user'

describe('UpdateStyleUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let style: Style
  let app: App

  const updateStyle = (
    props: object,
    name: string,
    styleId: string = style.id,
    accessToken = user.accessToken,
  ) => {
    return request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(UpdateStyleGql),
        variables: {
          input: {
            props,
            styleId,
            name,
          },
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
    )
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should update style for authenticated user', async () => {
    await updateStyle({ background: 'red' }, 'new name').expect((res) =>
      expect(res.body.data.updateStyle.name).toBe('new name'),
    )

    // Check that the props are updated too
    await getStyle(nestApp, style.id, user.accessToken).expect((res) => {
      expect(res.body.data.getStyle.props.background).toEqual('red')
    })
  })

  it('should not update style for guest user', async () => {
    const randomStyleId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await updateStyle(
      { background: 'red' },
      'new name',
      randomStyleId,
      '',
    ).then((res) => {
      expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
    })
  })

  it('should return error for wrong style id', async () => {
    const wrongStyleId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await updateStyle({ background: 'red' }, 'new name', wrongStyleId).expect(
      (res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Update style failed`)
      },
    )
  })
})
