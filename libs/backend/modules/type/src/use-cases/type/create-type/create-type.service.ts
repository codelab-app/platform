import { DgraphCreateUseCase } from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { TypeValidator } from '../../../domain/type.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { createType } from './create-type'
import { CreateTypeRequest } from './create-type.request'
import { CreateTypeInputFactory } from './create-type-input.factory'

/**
 * Depending on the type, we may assign a user to it. For example, primitive types are admin created & can only have 1 copy, so these aren't assigned users.
 *
 * But an interface created by a user should have an owner, while an interface created by admin shouldn't.
 *
 * TLDR: Admin created types don't have owners, while users do
 */
@Injectable()
export class CreateTypeService extends DgraphCreateUseCase<CreateTypeRequest> {
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
    request: CreateTypeRequest,
    txn: ITransaction,
  ) {
    await this.validate(request, txn)

    const inputType = CreateTypeInputFactory.toType(request.input)
    const type = createType(inputType)

    return this.typeRepository.create(type, txn)
  }

  private async validate(
    request: CreateTypeRequest,
    txn: ITransaction,
  ): Promise<void> {
    await this.typeValidator.validateCreateTypeInput(request.input, txn)
    await this.typeValidator.primitiveIsNotDuplicated(request, txn)
  }
}
