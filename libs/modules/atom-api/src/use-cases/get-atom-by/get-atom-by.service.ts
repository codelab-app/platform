import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetAtomByElementGql,
  GetAtomByElementQuery,
  GetAtomByElementQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomSchema } from '../../atom.model'
import { GetAtomByInput } from './get-atom-by.input'

type GqlVariablesType = GetAtomByElementQueryVariables
type GqlOperationType = GetAtomByElementQuery

@Injectable()
export class GetAtomByService extends QueryUseCase<
  GetAtomByInput,
  Atom | null,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql(request: GetAtomByInput) {
    if (request.byElement) {
      return GetAtomByElementGql
    }

    throw new Error('Bad request')
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return atomSchema.nullable().parse(result.data?.getElement?.atom || null)
  }

  protected mapVariables(request: GetAtomByInput): GqlVariablesType {
    if (request.byElement) {
      return {
        elementId: request.byElement.elementId,
      }
    }

    throw new Error('Bad request')
  }

  protected async validate(request: GetAtomByInput): Promise<void> {
    if (!request.byElement) {
      throw new Error('At least one filter must be provided to getAtomBy')
    }
  }
}
