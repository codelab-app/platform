import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { Role } from '@codelab/backend/adapters'
import {
  __AppFragment,
  DeletePageGql,
  DeletePageMutation,
  DeletePageMutationResult,
  DeletePageMutationVariables,
  PageBaseFragment,
} from '@codelab/codegen/graphql'
import { AppModule } from '@codelab/modules/app-api'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { createPage } from '../../helpers/create-page'
import { PageModule } from '../../page.module'

describe('DeletePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let page: { app: __AppFragment; page: PageBaseFragment }
  let variables: DeletePageMutationVariables

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule, PageModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([AppModule, PageModule], {
      role: Role.USER,
    })
    page = await createPage(userApp)
    variables = {
      input: {
        pageId: page.page.id,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete a page', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(DeletePageGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should delete a page', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(DeletePageGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<DeletePageMutationResult>) => {
          console.log(res)

          const deletePageResult = (res.body.data as DeletePageMutation)
            ?.deletePage

          expect(deletePageResult).toMatchObject({
            affected: 1,
          })
        })
    })
  })
})
