import { UseCasePort } from '@codelab/backend/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TypeUnusedError } from '../../../application/errors/type-unused.error'
import { TypeValidator } from '../../../domain/type.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { DeleteTypeRequest } from './delete-type.request'

@Injectable()
export class DeleteTypeService implements UseCasePort<DeleteTypeRequest, void> {
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private typeValidator: TypeValidator,
  ) {}

  async execute(request: DeleteTypeRequest) {
    await this.validate(request)

    const {
      input: { typeId },
      transaction,
    } = request

    await this.typeRepository.delete(typeId, transaction)
  }

  protected async validate({
    input: { typeId },
    transaction,
  }: DeleteTypeRequest) {
    // Check if the deleted type exists
    await this.typeValidator.typeExists(typeId, transaction)

    try {
      // If the deleted type is the propTypes of an atom, return an Error
      // the user needs to delete the atom first, otherwise our data will be corrupt (propTypes is a required field of Atom)
      // Also if any fields reference it. If there are any - prevent deleting it
      await this.typeValidator.typeIsNotReferenced(typeId, transaction)
    } catch (e) {
      if (e instanceof TypeUnusedError) {
        throw new TypeUnusedError(
          e.fieldNames,
          e.atomName,
          `Can't delete type ${e.message}`,
        )
      }
    }
  }
}
