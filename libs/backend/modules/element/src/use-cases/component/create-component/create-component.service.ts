import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateComponentRequest } from './create-component.request'

/**
 * Creates an Element and tags it with componentTag
 */
@Injectable()
export class CreateComponentService extends DgraphCreateUseCase<CreateComponentRequest> {
  protected async executeTransaction(
    request: CreateComponentRequest,
    txn: Txn,
  ): Promise<CreateResponse> {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { name }, currentUser }: CreateComponentRequest,
    blankNodeUid: string,
  ): Mutation {
    const createTagJson = {
      'dgraph.type': [DgraphEntityType.Tag],
      name,
      isRoot: true,
    }

    const createElementJson = {
      uid: blankNodeUid,
      name,
      'dgraph.type': [DgraphEntityType.Element],
      'children|order': 0,
      children: [],
      atom: undefined,
      props: '{}',
      owner: {
        uid: currentUser.id,
      },
      propTransformationJs: undefined,
      componentTag: createTagJson,
    }

    return {
      setJson: [createElementJson],
    }
  }
}
