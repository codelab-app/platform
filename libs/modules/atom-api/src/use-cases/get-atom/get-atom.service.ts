import {
  DgraphAtom,
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { AtomByElement, AtomById, GetAtomInput } from './get-atom.input'

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
      return this.dgraph.getOneOrThrow(
        txn,
        this.createGetByIdQuery(request.byId),
      )
    }

    if (request.byElement) {
      return this.dgraph
        .getOneOrThrow<DgraphElement>(
          txn,
          this.createGetByElementQuery(request.byElement),
          () => new Error('Element not found'),
        )
        .then((e) => e.atom || null)
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

  private validate({ byId, byElement }: GetAtomInput) {
    if (!byId && !byElement) {
      throw new Error('Provide at least one filter to GetAtomService')
    }
  }
}
