import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { GetAppService } from '../get-app'
import { UpdateAppRequest } from './update-app.request'

@Injectable()
export class UpdateAppService extends DgraphUseCase<
  UpdateAppRequest,
  DgraphApp | null
> {
  constructor(
    protected readonly dgraphRepository: DgraphRepository,
    private appValidator: AppValidator,
    private getAppService: GetAppService,
  ) {
    super(dgraphRepository)
  }

  protected async executeTransaction(
    request: UpdateAppRequest,
    txn: Txn,
  ): Promise<DgraphApp | null> {
    const {
      input: { id },
      currentUser,
    } = request

    await this.validate(request)
    await this.dgraph.executeMutation(txn, this.createMutation(request))

    const app = await this.getAppService.execute({
      input: { byId: { appId: id } },
      currentUser,
    })

    return app
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
