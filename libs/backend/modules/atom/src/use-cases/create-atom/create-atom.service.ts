import {
  IAtomRepository,
  IAtomRepositoryToken,
  ITransaction,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import {
  CreateTypeService,
  GetTypeService,
} from '@codelab/backend/modules/type'
import { IUser, TypeKind } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { GetAtomService } from '../get-atom'
import { CreateAtomInput } from './create-atom.input'
import { CreateAtomRequest } from './create-atom.request'

@Injectable()
export class CreateAtomService
  extends DgraphUseCase<CreateAtomRequest, CreateResponse>
  implements UseCasePort<CreateAtomRequest, CreateResponse>
{
  constructor(
    dgraph: DgraphRepository,
    @Inject(IAtomRepositoryToken)
    private atomRepo: IAtomRepository,
    private createTypeService: CreateTypeService,
    private getAtomService: GetAtomService,
    private getTypeService: GetTypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateAtomRequest,
    txn: ITransaction,
  ) {
    await this.validate(request)

    const { input, currentUser } = request
    const { apiId } = await this.createInterfaceIfMissing(input, currentUser)

    return this.atomRepo.create(
      { id: '', name: input.name, type: input.type, api: { id: apiId } },
      txn,
    )
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
