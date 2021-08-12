import {
  DgraphAtom,
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import {
  AtomByElement,
  AtomById,
  AtomByType,
  GetAtomInput,
} from './get-atom.input'

@Injectable()
export class GetAtomService extends DgraphUseCase<
  GetAtomInput,
  DgraphAtom | null
> {
  protected async executeTransaction(
    request: GetAtomInput,
    txn: Txn,
  ): Promise<DgraphAtom | null> {
    this.validate(request)

    if (request.byId) {
      return this.dgraph.getOne(txn, this.createGetByIdQuery(request.byId))
    }

    if (request.byType) {
      return this.dgraph.getOne(txn, this.createGetByType(request.byType))
    }

    if (request.byElement) {
      return this.dgraph
        .getOne<DgraphElement>(
          txn,
          this.createGetByElementQuery(request.byElement),
        )
        .then((e) => e?.atom || null)
    }

    throw new Error('Bad input to GetAtomsService')
  }

  private createGetByIdQuery(byId: AtomById) {
    return new DgraphQueryBuilder()
      .setUidFunc(byId.atomId)
      .addTypeFilterDirective(DgraphEntityType.Atom)
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(3))
  }

  private createGetByType(byType: AtomByType) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Atom)
      .addEqFilterDirective<DgraphAtom>('atomType', byType.atomType)
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(3))
  }

  private createGetByElementQuery(byElement: AtomByElement) {
    /**
     *  query(func: uid(0x0)) {
            uid
            dgraph.type
            expand(_all_) {
              uid
              dgraph.type
              expand(_all_)
            }
          }
     */
    return new DgraphQueryBuilder()
      .setUidFunc(byElement.elementId)
      .addTypeFilterDirective(DgraphEntityType.Atom)
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(3))
  }

  private validate({ byId, byElement, byType }: GetAtomInput) {
    if ([byId, byElement, byType].filter((f) => !!f).length !== 1) {
      throw new Error('Provide exactly one filter to GetAtomService')
    }
  }
}
