import { UseCasePort } from '@codelab/backend/abstract/core'
import { IType } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TypeValidator } from '../../../domain/type.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { UpdateTypeRequest } from './update-type.request'

@Injectable()
export class UpdateTypeService<
  TReq extends UpdateTypeRequest = UpdateTypeRequest,
> implements UseCasePort<TReq, void>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private typeValidator: TypeValidator,
  ) {}

  async execute(request: TReq) {
    await this.validate(request)

    const {
      input: { typeId },
      transaction,
    } = request

    const type = await this.typeRepository.getOne(typeId, transaction)

    if (!type) {
      // Shouldn't happen, we check in .validate
      throw new Error('Type not found')
    }

    this.doUpdate(type, request)

    await this.typeRepository.update(type, transaction)
  }

  protected async validate({
    input: { typeId },
    transaction,
  }: UpdateTypeRequest) {
    await this.typeValidator.typeExists(typeId, transaction)
  }

  protected doUpdate(type: IType, { input: { updateData } }: TReq) {
    type.name = updateData.name
  }
}
