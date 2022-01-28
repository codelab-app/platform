/// <reference types='jest'/>

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
      .expect((res: any) => {
        if (res.status != 200) {
          console.error(JSON.stringify(res.body, null, 2))
        }
      })
      .expect(200)
  )
}

export type ExpectedError = {
  message: string
}

export const request = (app: INestApplication) =>
  supertestRequest(app).post('/graphql').timeout(30000)

/**
 *
 * @param app
 * @param input
 * @param expectError Allow us to skip the results mapping, so we can assert the error message
 * @returns
 */
export const domainRequest = async <TInput, TResults = void>(
  app: INestApplication,
  gql: ASTNode,
  input?: TInput,
  expectedError?: ExpectedError,
  returnError?: boolean,
): Promise<TResults> => {
  const response = graphqlRequest(app, gql, {
    input,
  })

  const data = await response
    .then((res: ApiResponse) => {
      if (expectedError) {
        expect(res?.body?.errors).toMatchObject([
          { message: expectedError.message },
        ])

        // Satisfy return type
        return {} as any
      }

      if (!res.body.errors) {
        return res.body.data
      }

      if (!returnError) {
        throw new Error(JSON.stringify(res.body.errors, undefined, 2))
      }

      return { errors: res.body.errors }
    })
    .catch((e: any) => {
      console.error(e)
    })

  // if (!data) {
  //   throw new Error('Data is missing!')
  // }

  return data
}
