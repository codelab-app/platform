import { IElement } from '@codelab/shared/abstract/core'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import {
  UpdateElementsDocument,
  UpdateElementsMutationVariables,
} from './element.endpoints.graphql.gen'

export type UpdateElementsMutation = any

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

export const getSdk = (client: GraphQLClient) => {
  return {
    BatchUpdateElements(
      inputs: Array<UpdateElementsMutationVariables> = [],
      requestHeaders?: Dom.RequestInit['headers'],
    ) {
      const requests = inputs.map((input) => ({
        document: UpdateElementsDocument,
        variables: input,
      }))

      return client.batchRequests<Array<IElement>>(requests, {
        ...requestHeaders,
      })
    },
  }
}
