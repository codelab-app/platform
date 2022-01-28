import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { TypeUnusedError } from '../../../application/errors/type-unused.error'
import { TypeValidator } from '../../../domain/type.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { DeleteTypeRequest } from './delete-type.request'

@Injectable()
export class DeleteTypeService extends DgraphUseCase<DeleteTypeRequest> {
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private typeValidator: TypeValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteTypeRequest,
    txn: ITransaction,
  ) {
    await this.validate(request, txn)

    const {
      input: { typeId },
    } = request

    await this.typeRepository.delete(typeId, txn)
  }

  protected async validate(
    { input: { typeId } }: DeleteTypeRequest,
    txn: ITransaction,
  ) {
    // Check if the deleted type exists
    await this.typeValidator.typeExists(typeId, txn)

    try {
      // If the deleted type is the propTypes of an atom, return an Error
      // the user needs to delete the atom first, otherwise our data will be corrupt (propTypes is a required field of Atom)
      // Also if any fields reference it. If there are any - prevent deleting it
      await this.typeValidator.typeIsNotReferenced(typeId, txn)
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
