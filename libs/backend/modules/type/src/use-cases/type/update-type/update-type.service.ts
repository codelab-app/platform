import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdateTypeInput } from './update-type.input'

@Injectable()
export class UpdateTypeService extends DgraphUseCase<UpdateTypeInput> {
  constructor(dgraph: DgraphRepository, private typeValidator: TypeValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateTypeInput, txn: Txn) {
    await this.validate(request)
    await this.dgraph.executeMutation(
      txn,
      UpdateTypeService.createMutation(request),
    )
  }

  private static createMutation({
    typeId,
    updateData: { name },
  }: UpdateTypeInput) {
    return jsonMutation({
      uid: typeId,
      name,
    })
  }

  private async validate(request: UpdateTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }
}
