import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { Auth0Service } from '@codelab/modules/auth-api';
import { PageModule } from '../../page.module';
import { print } from 'graphql';
import { CreateAtomGql, CreatePageGql } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('CreatePage', () => {
  let app: INestApplication
  let accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, PageModule)

    const auth0Service = app.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should fail to create page for guest', async () => {
    await request(app.getHttpServer())
      .send({
        query: print(CreatePageGql),
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })
})
