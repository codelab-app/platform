import {
  DgraphAtom,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { CreateTypeService } from '@codelab/backend/modules/type'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateAtomInput } from './create-atom.input'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomInput> {
  constructor(
    dgraphRepository: DgraphRepository,
    private createTypeService: CreateTypeService,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(request: CreateAtomInput, txn: Txn) {
    // TODO: Validate api is a valid interfaceId

    const { type, name, api } = request

    /**
     * (1) Create atom
     */
    const { id: atomId } = await this.dgraph.create(txn, (blankNodeUid) =>
      CreateAtomService.createMutation(request, blankNodeUid),
    )

    let interfaceId = api

    /**
     * (2) Create interface if not existing
     */
    if (!api) {
      const { id } = await this.createTypeService.execute({
        name: `${name} API`,
        typeKind: TypeKind.InterfaceType,
      })

      interfaceId = id
    }

    /**
     * (3) Assign interface
     */
    const mu: Mutation = {}
    mu.setNquads = `<${atomId}> <api> <${interfaceId}> .`

    await this.dgraph.transactionWrapper(async (_txn) => {
      await this.dgraph.executeMutation(_txn, mu)
    })

    return { id: atomId }
  }

  private static createMutation(
    { type, name }: CreateAtomInput,
    blankNodeUid: string,
  ) {
    return jsonMutation<DgraphAtom>({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
    })
  }
}
