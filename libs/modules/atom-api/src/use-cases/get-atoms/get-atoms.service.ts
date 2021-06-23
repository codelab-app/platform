import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetAtomsGql,
  GetAtomsQuery,
  GetAtomsQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Atom, atomsSchema } from '../../atom.model'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService extends QueryUseCase<
  GetAtomsInput,
  Array<Atom>,
  GetAtomsQuery,
  GetAtomsQueryVariables
> {
  protected getGql() {
    return GetAtomsGql
  }

  protected extractDataFromResult(
    result: FetchResult<GetAtomsQuery>,
  ): Array<Atom> {
    return atomsSchema.parse(result?.data?.atoms)
  }

  protected mapVariables(): GetAtomsQueryVariables {
    return {}
  }
}
