import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { UpdateAppRequest } from './update-app.request'

@Injectable()
export class UpdateAppService extends DgraphUseCase<UpdateAppRequest> {
  constructor(
    protected readonly dgraphRepository: DgraphRepository,
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
    return jsonMutation({
      uid: id,
      name,
    })
  }

  protected async validate({ input: { id }, currentUser }: UpdateAppRequest) {
    await this.appValidator.existsAndIsOwnedBy(id, currentUser)
  }
}
