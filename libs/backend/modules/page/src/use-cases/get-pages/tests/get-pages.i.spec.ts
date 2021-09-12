import { domainRequest } from '@codelab/backend/infra'
import { CreateAppInput } from '@codelab/backend/modules/app'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
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
import { GetPagesInput } from '../get-pages.input'
import { TestGetPagesGql, TestGetPagesQuery } from './get-pages.api.graphql.gen'

describe('GetPages', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let getPagesInput: GetPagesInput
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

    getPagesInput = { byApp: { appId } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get pages', async () => {
      await domainRequest(guestApp, TestGetPagesGql, getPagesInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get pages', async () => {
      const { pages } = await domainRequest<GetPagesInput, TestGetPagesQuery>(
        userApp,
        TestGetPagesGql,
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
