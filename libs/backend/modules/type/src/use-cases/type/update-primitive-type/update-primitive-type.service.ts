import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdatePrimitiveTypeInput } from './update-primitive-type.input'

@Injectable()
export class UpdatePrimitiveTypeService extends DgraphUseCase<UpdatePrimitiveTypeInput> {
  constructor(dgraph: DgraphRepository, private typeValidator: TypeValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdatePrimitiveTypeInput,
    txn: Txn,
  ) {
    await this.validate(request)
    await this.dgraph.executeMutation(
      txn,
      UpdatePrimitiveTypeService.createMutation(request),
    )
  }

  private async validate(request: UpdatePrimitiveTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }

  private static createMutation({
    typeId,
    updateData: { name, primitiveKind },
  }: UpdatePrimitiveTypeInput) {
    return jsonMutation({
      uid: typeId,
      name,
      primitiveKind,
    })
  }
}
