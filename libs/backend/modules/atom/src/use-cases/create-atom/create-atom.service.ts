import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphAtom,
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { CreateTypeService } from '@codelab/backend/modules/type'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateAtomInput } from './create-atom.input'
import { CreateAtomRequest } from './create-atom.request'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomRequest> {
  constructor(
    dgraphRepository: DgraphRepository,
    private createTypeService: CreateTypeService,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(request: CreateAtomRequest, txn: Txn) {
    // TODO: Validate api is a valid interfaceId
    const {
      input: { name, api },
      currentUser,
    } = request

    /**
     * (1) Create atom
     */
    const { id: atomId } = await this.dgraph.create(txn, (blankNodeUid) =>
      CreateAtomService.createMutation(request.input, blankNodeUid),
    )

    let interfaceId = api

    /**
     * (2) Create interface if not existing
     */
    if (!api) {
      const { id } = await this.createTypeService.execute({
        input: {
          name: `${name} API`,
          typeKind: TypeKind.InterfaceType,
        },
        currentUser,
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
