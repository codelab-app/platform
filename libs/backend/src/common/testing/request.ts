/// <reference types='jest'/>

import { ApolloQueryResult } from '@apollo/client'
import { INestApplication } from '@nestjs/common'
import { ASTNode, print } from 'graphql'
import { default as supertestRequest } from 'supertest'

export type ApiResponse<T = Record<string, any>> = {
  body: T
  status: number
}

export const graphqlRequest = <TOperationVariables>(
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

type ExpectedError = {
  message: string
}

/**
 *
 * @param app
 * @param input
 * @param expectError Allow us to skip the results mapping, so we can assert the error message
 * @returns
 */
export const domainRequest = async <TInput extends any, TResults extends any>(
  app: INestApplication,
  gql: ASTNode,
  input: TInput,
  expectedError?: ExpectedError,
): Promise<TResults> => {
  const response = graphqlRequest(app, gql, {
    input,
  })

  if (expectedError) {
    await response.expect((res: ApiResponse<ApolloQueryResult<any>>) => {
      expect(res?.body?.errors).toMatchObject([
        { message: expectedError.message },
      ])
    })

    // Satisfy return type
    return {} as any
  }

  const data = await response.then((res: ApiResponse) => {
    return res.body.data
  })

  if (!data) {
    throw new Error('Data is missing!')
  }

  return data
}
