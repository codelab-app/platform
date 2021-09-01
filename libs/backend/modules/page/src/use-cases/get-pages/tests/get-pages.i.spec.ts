import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { CreateAppInput } from '@codelab/backend/modules/app'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../../../page.module'
import { CreatePageInput } from '../../create-page/create-page.input'
import {
  CreateAppGql,
  CreateAppMutation,
} from '../../create-page/tests/create-app.api.graphql'
import {
  CreatePageGql,
  CreatePageMutation,
} from '../../create-page/tests/create-page.api.graphql'
import { GetPagesInput } from '../get-pages.input'
import { GetPagesGql, GetPagesQuery } from './get-pages.api.graphql'

describe('GetPages', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let getPagesInput: GetPagesInput
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    guestApp = await setupTestModule([PageModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([PageModule], {
      role: Role.USER,
    })

    const result = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      { name: 'App' },
    )

    appId = result.createApp.id

    createPageInput = { name: 'My new page', appId }

    const pageResult = await domainRequest<CreatePageInput, CreatePageMutation>(
      userApp,
      CreatePageGql,
      createPageInput,
    )

    pageId = pageResult.createPage.id

    getPagesInput = { byApp: { appId } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get pages', async () => {
      await domainRequest(guestApp, GetPagesGql, getPagesInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get pages', async () => {
      const { pages } = await domainRequest<GetPagesInput, GetPagesQuery>(
        userApp,
        GetPagesGql,
        getPagesInput,
      )

      expect(pages).toMatchObject([
        {
          id: pageId,
          name: createPageInput.name,
        },
      ])
    })
  })
})
