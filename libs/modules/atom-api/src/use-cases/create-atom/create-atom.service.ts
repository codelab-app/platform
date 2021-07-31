import {
  DgraphAtom,
  DgraphCreateUseCase,
  DgraphEntityType,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomInput> {
  protected executeTransaction(request: CreateAtomInput, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  private createMutation(
    { type, name }: CreateAtomInput,
    blankNodeUid: string,
  ) {
    return jsonMutation<DgraphAtom>({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
      api: {
        name: `${name} API`,
        'dgraph.type': [DgraphEntityType.Type, DgraphEntityType.InterfaceType],
        fields: [],
      },
    })
  }
}
