import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { AtomSchema, IAtom } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import Fuse from 'fuse.js'
import { Maybe } from 'graphql/jsutils/Maybe'
import { GetAtomService } from '../get-atom'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService extends DgraphUseCase<
  Maybe<GetAtomsInput>,
  Array<IAtom>
> {
  protected schema = AtomSchema.array()

  protected async executeTransaction(request: Maybe<GetAtomsInput>, txn: Txn) {
    if (request && request.where) {
      exactlyOneWhereClause({ input: { where: request.where } }, [
        'ids',
        'types',
        'searchQuery',
      ])
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

    if (request?.where?.searchQuery) {
      const results = await this.dgraph.getAllNamed<IAtom>(
        txn,
        GetAtomService.getAtomQuery(
          `@filter(match(name, "${request.where.searchQuery}", 14))`,
        ),
        'query',
      )

      const fuse = new Fuse(results, {
        keys: ['name', 'type'],
        shouldSort: true,
        isCaseSensitive: false,
        threshold: 0.4,
      })

      return fuse.search(request.where.searchQuery).map((r) => r.item)
    }

    return this.dgraph.getAllNamed<IAtom>(
      txn,
      GetAtomService.getAtomQuery(),
      'query',
    )
  }
}
