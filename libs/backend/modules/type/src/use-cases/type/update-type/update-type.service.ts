import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IType } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdateTypeRequest } from './update-type.request'

@Injectable()
export class UpdateTypeService<
    TRequest extends UpdateTypeRequest = UpdateTypeRequest,
  >
  extends DgraphUseCase<TRequest>
  implements UseCasePort<TRequest, void>
{
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private typeValidator: TypeValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: TRequest, txn: ITransaction) {
    await this.validate(request, txn)

    const {
      input: { typeId },
    } = request

    const type = await this.typeRepository.getOne(typeId, txn)

    if (!type) {
      // Shouldn't happen, we check in .validate
      throw new Error('Type not found')
    }

    this.doUpdate(type, request)

    await this.typeRepository.update(type, txn)
  }

  protected async validate(
    { input: { typeId } }: UpdateTypeRequest,
    txn: ITransaction,
  ) {
    await this.typeValidator.typeExists(typeId, txn)
  }

  protected doUpdate(type: IType, { input: { updateData } }: TRequest) {
    type.name = updateData.name
  }
}
