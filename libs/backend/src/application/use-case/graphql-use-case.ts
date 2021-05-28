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
  TValidationContext = Record<string, unknown>,
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected constructor(protected apollo: ApolloClientService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const client = this.apollo.getClient()
    const validationContext = await this.validate(request)
    const variables = await this.getVariables(request, validationContext)
    const options = this.getOptions(request, validationContext) || {}
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

    return this.extractDataFromResult(result, validationContext, request)
  }

  protected abstract isMutation(): IsMutation

  protected abstract getGql():
    | DocumentNode
    | TypedDocumentNode<TOperation, TOperationVariables>

  protected getOptions(
    request: TUseCaseRequestPort,
    validationContext: TValidationContext,
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
    validationContext: TValidationContext,
  ): TOperationVariables | Promise<TOperationVariables>

  protected abstract extractDataFromResult(
    result: FetchResult<TOperation>,
    validationContext: TValidationContext,
    request: TUseCaseRequestPort,
  ): TUseCaseDtoResponse | Promise<TUseCaseDtoResponse>

  protected async validate(
    request: TUseCaseRequestPort,
  ): Promise<TValidationContext> {
    return {} as TValidationContext
  }
}
