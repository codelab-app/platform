import { DgraphUseCase } from '@codelab/backend/application'
import { IAtom } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'

@Injectable()
export class GetAtomsTypeHookService extends DgraphUseCase<any, Array<IAtom>> {
  protected executeTransaction(_: any, txn: Txn) {
    return this.dgraph.getAllNamed<IAtom>(
      txn,
      GetAtomService.getAtomQuery(`@filter(regexp(name, /^Hook.+/i))`),
      'query',
    )
  }
}
