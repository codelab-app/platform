import {
  IAtomRepository,
  IAtomRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import {
  DgraphUseCase,
  exactlyOneWhereClause,
} from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { AtomSchema, IAtom } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomsInput } from './get-atoms.input'

@Injectable()
export class GetAtomsService
  extends DgraphUseCase<Maybe<GetAtomsInput>, Array<IAtom>>
  implements UseCasePort<Maybe<GetAtomsInput>, Array<IAtom>>
{
  protected schema = AtomSchema.array()

  protected autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(IAtomRepositoryToken) private atomRepo: IAtomRepository,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: Maybe<GetAtomsInput>, txn: Txn) {
    if (request && request.where) {
      exactlyOneWhereClause({ input: { where: request.where } }, [
        'ids',
        'types',
        'searchQuery',
      ])
    }

    if (request?.where?.ids) {
      return this.atomRepo.getAllByIds(request.where.ids, txn)
    }

    if (request?.where?.types) {
      return this.atomRepo.getAtomsByTypes(request.where.types, txn)
    }

    if (request?.where?.searchQuery) {
      return this.atomRepo.searchAtomsByName(request.where.searchQuery, txn)
    }

    return this.atomRepo.getAll(txn)
  }
}
