import {
  DgraphRepository,
  DgraphType,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../type.validator'
import { UpdateTypeInput } from './update-type.input'

@Injectable()
export class UpdateTypeService extends DgraphUseCase<UpdateTypeInput> {
  constructor(dgraph: DgraphRepository, private typeValidator: TypeValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateTypeInput, txn: Txn) {
    await this.validate(request)
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private createMutation({ typeId, updateData: { name } }: UpdateTypeInput) {
    return jsonMutation<DgraphType<any>>({
      uid: typeId,
      name,
    })
  }

  private async validate(request: UpdateTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }
}
