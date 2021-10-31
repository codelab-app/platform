import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { AtomSchema, IAtom } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService extends DgraphUseCase<
  GetAtomsInput | undefined,
  Array<IAtom>
> {
  protected schema = AtomSchema.array()

  protected executeTransaction(request: GetAtomsInput | undefined, txn: Txn) {
    if (request && request.where) {
      exactlyOneWhereClause({ input: request as any }, ['ids', 'types'])
    }

    if (request?.where?.ids) {
      return this.dgraph.getAllNamed<IAtom>(
        txn,
        GetAtomService.getAtomQuery(
          `@filter(uid(${request.where.ids.join(',')}))`,
        ),
        'query',
      )
    }

    if (request?.where?.types) {
      return this.dgraph.getAllNamed<IAtom>(
        txn,
        GetAtomService.getAtomQuery(
          `@filter(eq(atomType, ${request.where.types.join(',')}))`,
        ),
        'query',
      )
    }

    return this.dgraph.getAllNamed<IAtom>(
      txn,
      GetAtomService.getAtomQuery(),
      'query',
    )
  }
}
