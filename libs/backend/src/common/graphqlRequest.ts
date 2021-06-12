import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { ASTNode } from 'graphql/language/ast'
import { request } from './request'

export interface GraphqlRequestOptions {
  /** defaults to true */
  expectNoErrors?: boolean
}

const defaultGraphqlRequestOptions: GraphqlRequestOptions = {
  expectNoErrors: true,
}

export const graphqlRequest = async <TOperationVariables>(
  app: INestApplication,
  gql: ASTNode,
  variables: TOperationVariables,
  options: GraphqlRequestOptions = {},
) => {
  const o = { ...defaultGraphqlRequestOptions, ...options }

  let promise = request(app.getHttpServer())
    .send({
      query: print(gql),
      variables,
    })
    .expect(200)

  if (o.expectNoErrors) {
    promise = promise.expect((res) => {
      const errors = res.body.errors

      if (errors && !!errors.length) {
        throw new Error(
          'Error in test graphql response: ' + JSON.stringify(errors, null, 2),
        )
      }
    })
  }

  return promise
}
