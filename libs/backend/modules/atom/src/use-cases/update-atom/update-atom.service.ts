import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphAtom,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { UpdateAtomInput } from './update-atom.input'

@Injectable()
export class UpdateAtomService extends DgraphUseCase<UpdateAtomInput> {
  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateAtomInput,
    txn: Txn,
  ): Promise<void> {
    const { atom } = await this.validate(request)

    await this.dgraph.executeMutation(
      txn,
      UpdateAtomService.createMutation(request, atom),
    )
  }

  private static createMutation(
    { id, data: { name, type } }: UpdateAtomInput,
    atom: DgraphAtom,
  ) {
    return jsonMutation<DgraphAtom>({
      uid: id,
      atomType: type,
      name,
      api: {
        uid: atom.api.uid,
        name: `${name} API`,
      },
    })
  }

  private async validate({ id }: UpdateAtomInput) {
    const atom = await this.getAtomService.execute({ where: { id } })

    if (!atom) {
      throw new Error("Atom doesn't exist")
    }

    return { atom }
  }
}
