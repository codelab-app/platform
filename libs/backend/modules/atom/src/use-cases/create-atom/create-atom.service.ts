import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  getUidFromResponse,
  ITransaction,
  jsonMutation,
} from '@codelab/backend/infra'
import {
  CreateTypeService,
  GetTypeService,
} from '@codelab/backend/modules/type'
import { IUser, TypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { GetAtomService } from '../get-atom'
import { CreateAtomInput } from './create-atom.input'
import { CreateAtomRequest } from './create-atom.request'

@Injectable()
export class CreateAtomService
  implements UseCasePort<CreateAtomRequest, CreateResponse>
{
  constructor(
    private dgraph: DgraphRepository,
    private createTypeService: CreateTypeService,
    private getAtomService: GetAtomService,
    private getTypeService: GetTypeService,
  ) {}

  async execute(request: CreateAtomRequest) {
    await this.validate(request)

    const { input, currentUser, transaction } = request

    const { apiId } = await this.createInterfaceIfMissing(
      input,
      transaction,
      currentUser,
    )

    const { atomId } = await this.createAtom(input, transaction, apiId)

    return { id: atomId }
  }

  private async createInterfaceIfMissing(
    input: CreateAtomInput,
    transaction: ITransaction,
    currentUser: IUser,
  ) {
    if (!input.api) {
      const { id } = await this.createTypeService.execute({
        input: { name: `${input.name} API`, typeKind: TypeKind.InterfaceType },
        transaction,
        currentUser,
      })

      return { apiId: id }
    }

    return { apiId: input.api }
  }

  private async createAtom(
    input: CreateAtomInput,
    transaction: ITransaction,
    apiId: string,
  ) {
    const blankNodeLabel = `atom`
    const blankNodeUid = `_:${blankNodeLabel}`

    const res = await transaction.mutate(
      CreateAtomService.createMutation(input, apiId, blankNodeUid),
    )

    const atomId = getUidFromResponse(res, blankNodeLabel)

    return { atomId }
  }

  private static createMutation(
    { type, name }: CreateAtomInput,
    apiId: string,
    blankNodeUid: string,
  ) {
    return jsonMutation({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
      api: { uid: apiId },
    })
  }

  private async validate(request: CreateAtomRequest) {
    const atom = await this.getAtomService.execute({
      input: { where: { type: request.input.type } },
      transaction: request.transaction,
    })

    if (atom) {
      throw new Error(`Atom of type ${request.input.type} already exists`)
    }

    if (request.input.api) {
      const type = await this.getTypeService.execute({
        input: { where: { id: request.input.api } },
        transaction: request.transaction,
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
