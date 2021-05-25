import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  DGraph__AtomFragment,
  GetAtomsGql,
  GetAtomsQuery,
  GetAtomsQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom } from '../../atom.model'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService extends QueryUseCase<
  GetAtomsInput,
  Array<Atom>,
  GetAtomsQuery,
  GetAtomsQueryVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetAtomsGql
  }

  protected extractDataFromResult(
    result: FetchResult<GetAtomsQuery>,
  ): Array<Atom> {
    const atoms = result?.data?.atoms?.filter(
      (atom): atom is DGraph__AtomFragment => !!atom,
    )

    if (!atoms) {
      throw new Error('Error while getting atoms')
    }

    return atoms
  }

  protected getVariables(): GetAtomsQueryVariables {
    return {}
  }
}
