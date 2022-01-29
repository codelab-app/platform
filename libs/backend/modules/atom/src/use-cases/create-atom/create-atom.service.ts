import {
  DgraphEntityType,
  ITransaction,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  getUidFromResponse,
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
  extends DgraphUseCase<CreateAtomRequest, CreateResponse>
  implements UseCasePort<CreateAtomRequest, CreateResponse>
{
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    private createTypeService: CreateTypeService,
    private getAtomService: GetAtomService,
    private getTypeService: GetTypeService,
  ) {
    super(dgraph)
  }

  async executeTransaction(request: CreateAtomRequest, txn: ITransaction) {
    await this.validate(request)

    const { input, currentUser } = request
    const { apiId } = await this.createInterfaceIfMissing(input, currentUser)
    const { atomId } = await this.createAtom(input, txn, apiId)

    return { id: atomId }
  }

  private async createInterfaceIfMissing(
    input: CreateAtomInput,
    currentUser: IUser,
  ) {
    if (!input.api) {
      const { id } = await this.createTypeService.execute({
        input: { name: `${input.name} API`, typeKind: TypeKind.InterfaceType },
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
    { type, name, tags }: CreateAtomInput,
    apiId: string,
    blankNodeUid: string,
  ) {
    return jsonMutation({
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Atom],
      atomType: type,
      name,
      tags,
      api: { uid: apiId },
    })
  }

  private async validate(request: CreateAtomRequest) {
    const atom = await this.getAtomService.execute({
      input: { where: { type: request.input.type } },
    })

    if (atom) {
      throw new Error(`Atom of type ${request.input.type} already exists`)
    }

    if (request.input.api) {
      const type = await this.getTypeService.execute({
        input: { where: { id: request.input.api } },
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
