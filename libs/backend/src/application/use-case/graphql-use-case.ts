import {
  MutationOptions,
  QueryOptions,
} from '@apollo/client/core/watchQueryOptions'
import { FetchResult } from '@apollo/client/link/core'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { DocumentNode } from 'graphql'
import { ApolloClientService } from '../../infrastructure'
import { UseCase } from '../index'

export abstract class GraphqlUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TOperation,
  TOperationVariables,
  IsMutation extends boolean,
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected constructor(protected apollo: ApolloClientService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const client = this.apollo.getClient()
    const variables = await this.getVariables(request)
    const options = this.getOptions(request) || {}
    let result: FetchResult<TOperation>

    if (this.isMutation()) {
      result = await client.mutate<TOperation, TOperationVariables>({
        mutation: this.getGql(),
        variables,
        ...options,
      })
    } else {
      result = await client.query<TOperation, TOperationVariables>({
        query: this.getGql(),
        variables,
        ...options,
      })
    }

    return this.extractDataFromResult(result)
  }

  protected abstract isMutation(): IsMutation

  protected abstract getGql():
    | DocumentNode
    | TypedDocumentNode<TOperation, TOperationVariables>

  protected getOptions(
    request: TUseCaseRequestPort,
  ):
    | (IsMutation extends true
        ? Omit<
            QueryOptions<TOperationVariables, TOperation>,
            'query' | 'variables'
          >
        : Omit<
            MutationOptions<TOperation, TOperationVariables>,
            'mutation' | 'variables'
          >)
    | undefined {
    return undefined
  }

  protected abstract getVariables(
    request: TUseCaseRequestPort,
  ): TOperationVariables | Promise<TOperationVariables>

  protected abstract extractDataFromResult(
    result: FetchResult<TOperation>,
  ): TUseCaseDtoResponse | Promise<TUseCaseDtoResponse>
}
