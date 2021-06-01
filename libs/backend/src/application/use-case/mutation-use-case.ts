import { FetchResult } from '@apollo/client/link/core'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { Injectable } from '@nestjs/common'
import { DocumentNode } from 'graphql'
import { ApolloClientService } from '../../infrastructure'
import { GraphqlUseCase } from './graphql-use-case'

@Injectable()
export abstract class MutationUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TMutation,
  TMutationVariables,
  TValidationContext = void,
> extends GraphqlUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TMutation,
  TMutationVariables,
  true,
  TValidationContext
> {
  constructor(protected apollo: ApolloClientService) {
    super(apollo)
  }

  protected isMutation(): true {
    return true
  }

  protected abstract getGql():
    | DocumentNode
    | TypedDocumentNode<TMutation, TMutationVariables>

  protected abstract mapVariables(
    request: TUseCaseRequestPort,
    validationContext: TValidationContext,
  ): TMutationVariables | Promise<TMutationVariables>

  protected abstract extractDataFromResult(
    result: FetchResult<TMutation>,
    validationContext: TValidationContext,
    request: TUseCaseRequestPort,
  ): TUseCaseDtoResponse | Promise<TUseCaseDtoResponse>
}
