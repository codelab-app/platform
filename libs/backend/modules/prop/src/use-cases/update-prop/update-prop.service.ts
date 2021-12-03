import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UpdatePropRequest } from './update-prop.request'

@Injectable()
export class UpdatePropService extends DgraphUseCase<UpdatePropRequest> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdatePropRequest, txn: Txn) {
    await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  protected createMutation({ input: { data, id } }: UpdatePropRequest) {
    return jsonMutation<any>({
      uid: id,
      data,
    })
  }

  protected async validate({
    input: { data },
  }: UpdatePropRequest): Promise<void> {
    JSON.parse(data)
  }
}
