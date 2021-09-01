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
import { GetPageInput } from '../get-page.input'
import { GetPageGql, GetPageQuery } from './get-page.api.graphql'

describe('GetPage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let getPageInput: GetPageInput
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

    getPageInput = { pageId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get a page', async () => {
      await domainRequest(guestApp, GetPageGql, getPageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a page', async () => {
      const { page } = await domainRequest<GetPageInput, GetPageQuery>(
        userApp,
        GetPageGql,
        getPageInput,
      )

      expect(page).toMatchObject({
        id: pageId,
        name: createPageInput.name,
      })
    })
  })
})
