import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { AppModule, CreateAppInput } from '@codelab/backend/modules/app'
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
import {
  TestGetPageGql,
  TestGetPageQuery,
} from '../../get-page/tests/get-page.api.graphql.gen'
import { DeletePageInput } from '../delete-page.input'
import { TestDeletePageGql } from './delete-page.api.graphql.gen'

describe('DeletePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let deletePageInput: DeletePageInput
  let getPageInput: GetPageInput

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

    const pageResult = await domainRequest<
      CreatePageInput,
      TestCreatePageMutation
    >(userApp, TestCreatePageGql, { name: 'My new page', appId })

    pageId = pageResult.createPage.id

    deletePageInput = { pageId }
    getPageInput = { pageId }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete a page', async () => {
      await domainRequest(guestApp, TestDeletePageGql, deletePageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete a page', async () => {
      await domainRequest(userApp, TestDeletePageGql, deletePageInput)

      await domainRequest<GetPageInput, TestGetPageQuery>(
        userApp,
        TestGetPageGql,
        getPageInput,
        { message: 'Page not found' },
      )
    })
  })
})
