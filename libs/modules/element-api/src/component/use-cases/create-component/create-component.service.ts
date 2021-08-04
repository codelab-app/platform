import {
  CreateResponse,
  DgraphComponent,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphRepository,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateComponentRequest } from './create-component.request'

@Injectable()
export class CreateComponentService extends DgraphCreateUseCase<CreateComponentRequest> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateComponentRequest,
    txn: Txn,
  ): Promise<CreateResponse> {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { name } }: CreateComponentRequest,
    blankNodeUid: string,
  ): Mutation {
    const createPageJson: DgraphCreateMutationJson<DgraphComponent> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.Component],
      name,
      root: {
        'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Element],
        name: 'Root element',
        children: [],
        props: '{}',
      },
    }

    return {
      setJson: [createPageJson],
    }
  }
}
