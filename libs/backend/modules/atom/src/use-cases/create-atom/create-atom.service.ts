import {
  DgraphAtom,
  DgraphCreateUseCase,
  DgraphEntityType,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomInput> {
  protected executeTransaction(request: CreateAtomInput, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      CreateAtomService.createMutation(request, blankNodeUid),
    )
  }

  private static createMutation(
    { type, name, label }: CreateAtomInput,
    blankNodeUid: string,
  ) {
    return jsonMutation<DgraphAtom>({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      label,
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
