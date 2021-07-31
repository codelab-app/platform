import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateAppGql,
  CreateAppInput,
  CreateAppMutation,
  CreatePageGql,
  CreatePageInput,
  CreatePageMutation,
  DeletePageGql,
  DeletePageInput,
  GetPageGql,
  GetPageInput,
  GetPageQuery,
} from '@codelab/codegen/graphql'
import { AppModule } from '@codelab/modules/app-api'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../../../page.module'

describe('DeletePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let pageId: string
  let appId: string
  let deletePageInput: DeletePageInput
  let getPageInput: GetPageInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule, PageModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([AppModule, PageModule], {
      role: Role.USER,
    })

    const result = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      { name: 'App' },
    )

    appId = result.createApp.id

    const pageResult = await domainRequest<CreatePageInput, CreatePageMutation>(
      userApp,
      CreatePageGql,
      { name: 'My new page', appId },
    )

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
      await domainRequest(guestApp, DeletePageGql, deletePageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete a page', async () => {
      await domainRequest(userApp, DeletePageGql, deletePageInput)

      await domainRequest<GetPageInput, GetPageQuery>(
        userApp,
        GetPageGql,
        getPageInput,
        { message: 'Page not found' },
      )
    })
  })
})
