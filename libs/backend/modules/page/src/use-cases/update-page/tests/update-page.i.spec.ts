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
import { GetPageInput } from '../../get-page/get-page.input'
import { UpdatePageInput } from '../update-page.input'
import {
  TestUpdatePageGql,
  TestUpdatePageMutation,
} from './update-page.api.graphql.gen'

describe('UpdatePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let getPageInput: GetPageInput
  let updatePageInput: UpdatePageInput
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
    updatePageInput = { pageId, updateData: { name: 'New name', appId } }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not update page', async () => {
      await domainRequest(guestApp, TestUpdatePageGql, updatePageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update page', async () => {
      const { updatePage } = await domainRequest<
        UpdatePageInput,
        TestUpdatePageMutation
      >(userApp, TestUpdatePageGql, updatePageInput)

      expect(updatePage).toMatchObject({
        id: pageId,
        name: updatePageInput.updateData.name,
      })
    })
  })
})
