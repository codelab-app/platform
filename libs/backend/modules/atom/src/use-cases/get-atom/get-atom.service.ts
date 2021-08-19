import {
  DgraphAtom,
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomInput } from './get-atom.input'

@Injectable()
export class GetAtomService extends DgraphUseCase<
  GetAtomInput,
  DgraphAtom | null
> {
  protected async executeTransaction(
    input: GetAtomInput,
    txn: Txn,
  ): Promise<DgraphAtom | null> {
    GetAtomService.validate(input)

    const {
      where: { id, type, element },
    } = input

    if (id) {
      return this.dgraph.getOne(txn, GetAtomService.createGetByIdQuery(id))
    }

    if (type) {
      return this.dgraph.getOne(txn, GetAtomService.createGetByType(type))
    }

    if (element) {
      return this.dgraph
        .getOne<DgraphElement>(
          txn,
          GetAtomService.createGetByElementQuery(element),
        )
        .then((e) => e?.atom || null)
    }

    throw new Error('Bad input to GetAtomsService')
  }

  private static createGetByIdQuery(id: string) {
    return new DgraphQueryBuilder()
      .setUidFunc(id)
      .addTypeFilterDirective(DgraphEntityType.Atom)
      .addBaseFields()
      .addRecurseDirective()
      .addExpandAll()
  }

  private static createGetByType(type: string) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Atom)
      .addEqFilterDirective<DgraphAtom>('atomType', type)
      .addBaseFields()
      .addRecurseDirective()
      .addExpandAll()
  }

  private static createGetByElementQuery(elementId: string) {
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
      .setUidFunc(elementId)
      .addTypeFilterDirective(DgraphEntityType.Atom)
      .addBaseFields()
      .addRecurseDirective()
      .addExpandAll()
  }

  private static validate({ where: { id, element, type } }: GetAtomInput) {
    if ([id, element, type].filter((f) => !!f).length !== 1) {
      throw new Error('Provide exactly one filter to GetAtomService')
    }
  }
}
