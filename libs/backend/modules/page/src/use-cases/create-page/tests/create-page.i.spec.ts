import { domainRequest } from '@codelab/backend/infra'
import { AppModule, CreateAppInput } from '@codelab/backend/modules/app'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../../../page.module'
import { GetPageInput } from '../../get-page/get-page.input'
import {
  TestGetPageGql,
  TestGetPageQuery,
} from '../../get-page/tests/get-page.api.graphql.gen'
import { CreatePageInput } from '../create-page.input'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from './create-app.api.graphql.gen'
import {
  TestCreatePageGql,
  TestCreatePageMutation,
} from './create-page.api.graphql.gen'

describe('CreatePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule, PageModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([AppModule, PageModule], {
      role: Role.User,
    })

    const result = await domainRequest<CreateAppInput, TestCreateAppMutation>(
      userApp,
      TestCreateAppGql,
      { name: 'App' },
    )

    appId = result.createApp.id

    createPageInput = {
      name: 'My new page',
      appId,
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a page', async () => {
      await domainRequest(guestApp, TestCreatePageGql, createPageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create a page', async () => {
      const {
        createPage: { id: pageId },
      } = await domainRequest<CreatePageInput, TestCreatePageMutation>(
        userApp,
        TestCreatePageGql,
        createPageInput,
      )

      expect(pageId).toBeDefined()

      const { page } = await domainRequest<GetPageInput, TestGetPageQuery>(
        userApp,
        TestGetPageGql,
        { pageId },
      )

      expect(page).toBeDefined()

      expect(page).toMatchObject({
        id: pageId,
        name: createPageInput.name,
      })
    })
  })
})
