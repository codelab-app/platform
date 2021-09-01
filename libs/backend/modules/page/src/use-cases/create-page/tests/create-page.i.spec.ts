import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { AppModule, CreateAppInput } from '@codelab/backend/modules/app'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../../../page.module'
import { GetPageInput } from '../../get-page/get-page.input'
import {
  GetPageGql,
  GetPageQuery,
} from '../../get-page/tests/get-page.api.graphql'
import { CreatePageInput } from '../create-page.input'
import { CreateAppGql, CreateAppMutation } from './create-app.api.graphql'
import { CreatePageGql, CreatePageMutation } from './create-page.api.graphql'

describe('CreatePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let appId: string
  let createPageInput: CreatePageInput

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
      await domainRequest(guestApp, CreatePageGql, createPageInput, {
        message: 'Unauthorized',
      })
    })

    describe('User', () => {
      it('should create a page', async () => {
        const {
          createPage: { id: pageId },
        } = await domainRequest<CreatePageInput, CreatePageMutation>(
          userApp,
          CreatePageGql,
          createPageInput,
        )

        expect(pageId).toBeDefined()

        const { page } = await domainRequest<GetPageInput, GetPageQuery>(
          userApp,
          GetPageGql,
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
})
