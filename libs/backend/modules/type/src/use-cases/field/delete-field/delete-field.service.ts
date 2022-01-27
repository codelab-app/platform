import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, ITransaction } from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { FieldValidator } from '../../../domain/field/field.validator'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { DeleteFieldRequest } from './delete-field.request'

@Injectable()
export class DeleteFieldService extends DgraphUseCase<DeleteFieldRequest> {
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
    private fieldValidator: FieldValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteFieldRequest,
    txn: ITransaction,
  ) {
    const {
      input: { fieldId, interfaceId },
    } = request

    await this.validate(request)

    const theInterface = await this.typeRepository.getOne(interfaceId, txn)

    if (!theInterface) {
      throw new Error('Interface not found')
    }

    if (theInterface.typeKind !== TypeKind.InterfaceType) {
      throw new Error("Type is not interface, can't add field to it")
    }

    theInterface.fields = theInterface.fields.filter(
      (field) => field.id !== fieldId,
    )

    await this.typeRepository.update(theInterface, txn)
  }

  private async validate({ input: { fieldId } }: DeleteFieldRequest) {
    await this.fieldValidator.exists(fieldId)
  }
}
