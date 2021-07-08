import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ASTNode } from 'graphql/language/ast'
import { request } from './request'

export interface GraphqlRequestOptions {
  /** defaults to true */
  expectNoErrors?: boolean
  accessToken?: string
}

const defaultGraphqlRequestOptions: GraphqlRequestOptions = {
  expectNoErrors: true,
  accessToken: undefined,
}

export const graphqlRequest = async <TOperationVariables>(
  app: INestApplication,
  gql: ASTNode,
  variables: TOperationVariables,
  options: GraphqlRequestOptions = {},
) => {
  const o = { ...defaultGraphqlRequestOptions, ...options }
  let httpRequest = request(app.getHttpServer())
  let results

  if (o.accessToken) {
    httpRequest = httpRequest.set('Authorization', `Bearer ${o.accessToken}`)
  }

  results = httpRequest
    .send({
      query: print(gql),
      variables,
    })
    .expect(200)

  if (o.expectNoErrors) {
    results = httpRequest.expect((res) => {
      const errors = res.body.errors

      if (errors && !!errors.length) {
        throw new Error(
          'Error in test graphql response: ' + JSON.stringify(errors, null, 2),
        )
      }
    })
  }

  return results
}
