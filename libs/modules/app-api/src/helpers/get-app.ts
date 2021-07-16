import { ApiResponse, request } from '@codelab/backend'
import {
  GetAppGql,
  GetAppInput,
  GetAppQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'

export const getApp = async (app: INestApplication, input: GetAppInput) => {
  return await request(app.getHttpServer())
    .send({
      query: print(GetAppGql),
      variables: { input },
    })
    .expect(200)
    .then((res: ApiResponse<GetAppQueryResult>) => {
      return res.body.data?.getApp
    })
}
