import {
  DgraphComponent,
  DgraphRepository,
  DgraphUpdateMutationJson,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ComponentValidator } from '../../component.validator'
import { UpdateComponentRequest } from './update-component.request'

@Injectable()
export class UpdateComponentService extends DgraphUseCase<UpdateComponentRequest> {
  constructor(
    dgraph: DgraphRepository,
    private componentValidator: ComponentValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateComponentRequest,
    txn: Txn,
  ): Promise<void> {
    await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private createMutation({
    input: {
      componentId,
      updateData: { name },
    },
  }: UpdateComponentRequest) {
    const mu: Mutation = {}

    const updatePageJson: DgraphUpdateMutationJson<DgraphComponent> = {
      uid: componentId,
      name,
    }

    mu.setJson = updatePageJson

    return mu
  }

  protected async validate({ input: { componentId } }: UpdateComponentRequest) {
    return this.componentValidator.exists(componentId)
  }
}
