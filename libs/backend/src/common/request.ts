import { INestApplication } from '@nestjs/common'
import { ASTNode, print } from 'graphql'
import { default as supertestRequest } from 'supertest'

export const request = (app: INestApplication) =>
  supertestRequest(app).post('/graphql').timeout(30000)

export type ApiResponse<T = Record<string, any>> = {
  body: T
  status: number
}

export type GraphqlRequest<TOperationVariables, TResponse> = (
  app: INestApplication,
  variables: TOperationVariables,
  gql: ASTNode,
) => Promise<TResponse>

export const graphqlRequest = <TOperationVariables, TResponse>(
  app: INestApplication,
  gql: ASTNode,
  variables: TOperationVariables,
) => {
  return (
    supertestRequest(app.getHttpServer())
      .post('/graphql')
      .timeout(30000)
      .send({
        query: print(gql),
        variables,
      })
      // This helps us log error
      .expect((res) => {
        if (res.status != 200) {
          console.log(JSON.stringify(res.body, null, 2))
        }
      })
      .expect(200)
  )
}
