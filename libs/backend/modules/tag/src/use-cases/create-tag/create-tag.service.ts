import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
  DgraphTag,
  DgraphTagTree,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetTagService } from '../get-tag'
import { SeedTagTreeService } from '../seed-tag-tree'
import { CreateTagRequest } from './create-tag.request'

@Injectable()
export class CreateTagService extends DgraphCreateUseCase<CreateTagRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private getTagService: GetTagService,
    private seedTagTree: SeedTagTreeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: CreateTagRequest, txn: Txn) {
    console.log(request)

    if (request.input.parent) {
      return await this.dgraph.create(txn, (blankNodeUid) =>
        CreateTagService.createTagMutation(request, blankNodeUid),
      )
    }

    return await this.dgraph.create(txn, (blankNodeUid) =>
      this.createRootTagMutation(request, blankNodeUid),
    )
  }

  async getRootTag() {
    return await this.getTagService.execute({
      where: { name: SeedTagTreeService.__TAG_ROOT },
    })
  }

  private createRootTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      currentUser,
    } = request

    return jsonMutation<DgraphTag>({
      uid: blankNodeUid,
      name,
      owner: { uid: currentUser.id },
      parent: undefined,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    })
  }

  private static createTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name, parent },
      currentUser,
    } = request

    if (!parent) {
      throw new Error('Must have parent')
    }

    const createJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      owner: { uid: currentUser.id },
      parent: { uid: parent },
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    }

    return {
      setJson: {
        uid: parent,
        children: createJson,
      },
    }
  }

  // private static createTagTreeMutation(
  //   request: CreateTagRequest,
  //   blankNodeUid: string,
  // ) {
  //   const {
  //     input: { name },
  //     currentUser,
  //   } = request

  //   const createJson: DgraphCreateMutationJson<DgraphTagTree> = {
  //     uid: '_:tagTree',
  //     ownerId: currentUser.id,
  //     'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.TagTree],
  //     root: {
  //       uid: blankNodeUid,
  //       name,
  //       ownerId: currentUser.id,
  //       'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
  //       children: [],
  //     },
  //   }

  //   return {
  //     setJson: [createJson],
  //   }
  // }
}
