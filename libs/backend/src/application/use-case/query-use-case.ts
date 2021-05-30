import { FetchResult } from '@apollo/client/link/core'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { DocumentNode } from 'graphql'
import { ApolloClientService } from '../../infrastructure'
import { GraphqlUseCase } from './graphql-use-case'

export abstract class QueryUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TQuery,
  TQueryVariables,
  TValidationContext = void,
> extends GraphqlUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TQuery,
  TQueryVariables,
  false,
  TValidationContext
> {
  protected constructor(protected apollo: ApolloClientService) {
    super(apollo)
  }

  protected isMutation(): false {
    return false
  }

  protected abstract getGql():
    | DocumentNode
    | TypedDocumentNode<TQuery, TQueryVariables>

  protected abstract mapVariables(
    request: TUseCaseRequestPort,
    validationContext: TValidationContext,
  ): TQueryVariables | Promise<TQueryVariables>

  protected abstract extractDataFromResult(
    result: FetchResult<TQuery>,
    validationContext: TValidationContext,
    request: TUseCaseRequestPort,
  ): TUseCaseDtoResponse | Promise<TUseCaseDtoResponse>
}
