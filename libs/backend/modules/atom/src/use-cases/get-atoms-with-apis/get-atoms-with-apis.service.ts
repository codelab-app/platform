import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphAtom,
  DgraphEntityType,
  sortByUids,
} from '@codelab/backend/infra'
import { baseTypeQuery } from '@codelab/backend/modules/type'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomsInput } from '../get-atoms/get-atoms.input'

@Injectable()
export class GetAtomsWithApisService extends DgraphUseCase<
  GetAtomsInput | undefined,
  Array<DgraphAtom>
> {
  protected async executeTransaction(request: GetAtomsInput, txn: Txn) {
    return this.dgraph
      .getAll<DgraphAtom>(txn, GetAtomsWithApisService.createQuery(request))
      .then(sortByUids)
  }

  private static createQuery(input?: GetAtomsInput) {
    const q = baseTypeQuery().addFields(`
        name
        atomType
        api
      `)

    if (input?.where?.ids && input.where.ids.length > 0) {
      q.setUidsFunc(input.where.ids)
      q.addTypeFilterDirective(DgraphEntityType.Atom)
    } else {
      q.setTypeFunc(DgraphEntityType.Atom)
    }

    return q
  }
}
