import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreatePropInput } from './create-prop.input'
import { CreatePropRequest } from './create-prop.request'

@Injectable()
export class CreatePropService extends DgraphUseCase<
  CreatePropRequest,
  CreateResponsePort
> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePropRequest,
    txn: Txn,
  ): Promise<CreateResponsePort> {
    const res = await this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request.input, blankNodeUid),
    )

    return res
  }

  protected createMutation(input: CreatePropInput, uid: string): Mutation {
    const { data } = input

    const setJson: DgraphCreateMutationJson<any> =
      CreatePropService.createPropsMutation(data, uid)

    return {
      setJson,
    }
  }

  public static createPropsMutation(data: string, uid: string | undefined) {
    return { uid, 'dgraph.type': [DgraphEntityType.Prop], data }
  }
}
