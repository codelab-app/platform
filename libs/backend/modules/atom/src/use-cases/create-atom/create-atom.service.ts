import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import {
  CreateTypeService,
  GetTypeService,
} from '@codelab/backend/modules/type'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { CreateAtomInput } from './create-atom.input'
import { CreateAtomRequest } from './create-atom.request'

@Injectable()
export class CreateAtomService extends DgraphCreateUseCase<CreateAtomRequest> {
  constructor(
    dgraphRepository: DgraphRepository,
    private createTypeService: CreateTypeService,
    private getAtomService: GetAtomService,
    private getTypeService: GetTypeService,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(request: CreateAtomRequest, txn: Txn) {
    await this.validate(request)

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
    const mu: Mutation = {
      setNquads: `<${atomId}> <api> <${interfaceId}> .`,
    }

    await this.dgraph.transactionWrapper(async (_txn) => {
      await this.dgraph.executeMutation(_txn, mu)
    })

    return { id: atomId }
  }

  private static createMutation(
    { type, name }: CreateAtomInput,
    blankNodeUid: string,
  ) {
    return jsonMutation({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
    })
  }

  private async validate(request: CreateAtomRequest) {
    const atom = await this.getAtomService.execute({
      where: { type: request.input.type },
    })

    if (atom) {
      throw new Error(`Atom of type ${request.input.type} already exists`)
    }

    if (request.input.api) {
      const type = await this.getTypeService.execute({
        input: { where: { id: request.input.api } },
        currentUser: request.currentUser,
      })

      if (!type) {
        throw new Error(`Type ${request.input.api} does not exist`)
      }

      if (type.typeKind !== TypeKind.InterfaceType) {
        throw new Error(`Type ${request.input.api} is not an interface`)
      }
    }
  }
}
