/// <reference types='jest'/>

import { INestApplication } from '@nestjs/common'
import { default as supertestRequest } from 'supertest'

export type ApiResponse<T = Record<string, any>> = {
  body: T
  status: number
}

export const graphqlRequest = <TOperationVariables>(
  app: INestApplication,
  query: string,
  variables: TOperationVariables,
) => {
  return (
    supertestRequest(app.getHttpServer())
      .post('/graphql')
      .timeout(30000)
      .send({
        query,
        variables,
      })
      // This helps us log error
      .expect((res) => {
        if (res.status != 200) {
          console.error(JSON.stringify(res.body, null, 2))
        }
      })
      .expect(200)
  )
}

type ExpectedError = {
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
export const domainRequest = async <
  TInput extends any,
  TResults extends any = void,
>(
  app: INestApplication,
  gql: string,
  input?: TInput,
  expectedError?: ExpectedError,
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
      } else if (res.body.errors) {
        throw new Error(JSON.stringify(res.body.errors, undefined, 2))
      }

      return res.body.data
    })
    .catch((e) => {
      console.error(e)
    })

  // if (!data) {
  //   throw new Error('Data is missing!')
  // }

  return data
}
