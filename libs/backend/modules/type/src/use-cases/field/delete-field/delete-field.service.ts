import { UseCasePort } from '@codelab/backend/abstract/core'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { FieldValidator } from '../../../domain/field/field.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { DeleteFieldRequest } from './delete-field.request'

@Injectable()
export class DeleteFieldService
  implements UseCasePort<DeleteFieldRequest, void>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private fieldValidator: FieldValidator,
  ) {}

  async execute(request: DeleteFieldRequest) {
    const {
      input: { fieldId, interfaceId },
      transaction,
    } = request

    await this.validate(request)

    const theInterface = await this.typeRepository.getOne(
      interfaceId,
      transaction,
    )

    if (!theInterface) {
      throw new Error('Interface not found')
    }

    if (theInterface.typeKind !== TypeKind.InterfaceType) {
      throw new Error("Type is not interface, can't add field to it")
    }

    theInterface.fields = theInterface.fields.filter(
      (field) => field.id !== fieldId,
    )

    await this.typeRepository.update(theInterface, transaction)
  }

  private async validate({
    input: { fieldId },
    transaction,
  }: DeleteFieldRequest) {
    await this.fieldValidator.exists(fieldId, transaction)
  }
}
