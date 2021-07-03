import { __AppFragment, CreateAppGql, CreateAppMutation, CreateAppMutationVariables } from '@codelab/codegen/graphql';
import { ApiResponse, request, setupTestModule } from '@codelab/backend';
import { print } from 'graphql';
import { ApolloQueryResult } from '@apollo/client';
import { AppModule } from '@codelab/modules/app-api';

export const createApp = async (accessToken: string ='') => {
  const app = await setupTestModule(true, AppModule)
  const variables: CreateAppMutationVariables = {
    input: {
      name: 'Test App'
    }
  }

  const r: __AppFragment = await request(app.getHttpServer())
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: print(CreateAppGql),
      variables,
    })
    .expect(200)
    // .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
    //   const a = ''
    // })
    .then((res: any) => (res.body.data as CreateAppMutation)?.createApp)

  await app.close()

  return r
}
