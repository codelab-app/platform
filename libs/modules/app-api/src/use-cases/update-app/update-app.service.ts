import {
  DgraphApp,
  DgraphRepository,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { AppValidator } from '../../app.validator'
import { UpdateAppRequest } from './update-app.request'

@Injectable()
export class UpdateAppService extends DgraphUseCase<UpdateAppRequest> {
  constructor(
    dgraphRepository: DgraphRepository,
    private appValidator: AppValidator,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(
    request: UpdateAppRequest,
    txn: Txn,
  ): Promise<void> {
    await this.validate(request)
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  protected createMutation({
    input: {
      id,
      data: { name },
    },
  }: UpdateAppRequest): Mutation {
    return jsonMutation<DgraphApp>({
      uid: id,
      name,
    })
  }

  protected async validate({
    input: { id },
    currentUser,
  }: UpdateAppRequest): Promise<void> {
    await this.appValidator.existsAndIsOwnedBy(id, currentUser)
  }
}
