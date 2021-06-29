import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetAtomByPageElementGql,
  GetAtomByPageElementQuery,
  GetAtomByPageElementQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomSchema } from '../../atom.model'
import { GetAtomByInput } from './get-atom-by.input'

type GqlVariablesType = GetAtomByPageElementQueryVariables
type GqlOperationType = GetAtomByPageElementQuery

@Injectable()
export class GetAtomByService extends QueryUseCase<
  GetAtomByInput,
  Atom | null,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql(request: GetAtomByInput) {
    if (request.byPageElement) {
      return GetAtomByPageElementGql
    }

    throw new Error('Bad request')
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return atomSchema
      .nullable()
      .parse(result.data?.getPageElement?.atom || null)
  }

  protected mapVariables(request: GetAtomByInput): GqlVariablesType {
    if (request.byPageElement) {
      return {
        pageElementId: request.byPageElement.pageElementId,
      }
    }

    throw new Error('Bad request')
  }

  protected async validate(request: GetAtomByInput): Promise<void> {
    if (!request.byPageElement) {
      throw new Error('At least one filter must be provided to getAtomBy')
    }
  }
}
