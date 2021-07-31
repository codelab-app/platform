import {
  DgraphAtom,
  DgraphEntityType,
  DgraphInterfaceType,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetAtomService } from '../get-atom'
import { DeleteAtomInput } from './delete-atom.input'

@Injectable()
export class DeleteAtomService extends DgraphUseCase<DeleteAtomInput> {
  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteAtomInput,
    txn: Txn,
  ): Promise<void> {
    const { atomId } = request
    await this.validate(request)

    await this.dgraph.executeUpsertDeleteAll(txn, (q) =>
      q
        .addTypeFilterDirective(DgraphEntityType.Atom)
        .setUidFunc(atomId)
        .addJsonFields<DgraphAtom & DgraphInterfaceType>({
          api: true,
          fields: true,
        }),
    )
  }

  protected async validate({ atomId }: DeleteAtomInput) {
    const atom = await this.getAtomService.execute({ byId: { atomId } })

    if (!atom) {
      throw new Error("Can't delete, atom not found")
    }
  }
}
