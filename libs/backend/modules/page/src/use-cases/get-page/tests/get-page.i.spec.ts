import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { CreateAppInput } from '@codelab/backend/modules/app'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../../../page.module'
import { CreatePageInput } from '../../create-page'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from '../../create-page/tests/create-app.api.graphql.gen'
import {
  TestCreatePageGql,
  TestCreatePageMutation,
} from '../../create-page/tests/create-page.api.graphql.gen'
import { GetPageInput } from '../get-page.input'
import { TestGetPageGql, TestGetPageQuery } from './get-page.api.graphql.gen'

describe('GetPage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let getPageInput: GetPageInput
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    guestApp = await setupTestModule([PageModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([PageModule], {
      role: Role.User,
    })

    const result = await domainRequest<CreateAppInput, TestCreateAppMutation>(
      userApp,
      TestCreateAppGql,
      { name: 'App' },
    )

    appId = result.createApp.id

    createPageInput = { name: 'My new page', appId }

    const pageResult = await domainRequest<
      CreatePageInput,
      TestCreatePageMutation
    >(userApp, TestCreatePageGql, createPageInput)

    pageId = pageResult.createPage.id

    getPageInput = { pageId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get a page', async () => {
      await domainRequest(guestApp, TestGetPageGql, getPageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a page', async () => {
      const { page } = await domainRequest<GetPageInput, TestGetPageQuery>(
        userApp,
        TestGetPageGql,
        getPageInput,
      )

      expect(page).toMatchObject({
        id: pageId,
        name: createPageInput.name,
      })
    })
  })
})
