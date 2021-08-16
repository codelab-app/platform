import {
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphRepository,
  DgraphTag,
  DgraphTagTree,
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
    const rootTagId = await this.seedTagTree.execute(request)

    console.log(rootTagId)

    if (request.input.isRoot) {
      request.input.parentTagId = rootTagId
    }

    return await this.dgraph.create(txn, (blankNodeUid) =>
      CreateTagService.createMutation(request, blankNodeUid),
    )
  }

  async getRootTag() {
    return await this.getTagService.execute({
      where: { name: SeedTagTreeService.__TAG_ROOT },
    })
  }

  private static createMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ): Mutation {
    const {
      input: { isRoot },
    } = request

    return CreateTagService.createTagMutation(request, blankNodeUid)
  }

  private static createTagMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name, parentTagId },
      owner,
    } = request

    const createJson: DgraphCreateMutationJson<DgraphTag> = {
      uid: blankNodeUid,
      name,
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
      children: [],
    }

    return {
      setJson: {
        uid: parentTagId,
        children: createJson,
      },
    }
  }

  private static createTagTreeMutation(
    request: CreateTagRequest,
    blankNodeUid: string,
  ) {
    const {
      input: { name },
      owner,
    } = request

    const createJson: DgraphCreateMutationJson<DgraphTagTree> = {
      uid: '_:tagTree',
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.TagTree],
      root: {
        uid: blankNodeUid,
        name,
        ownerId: owner.sub,
        'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
        children: [],
      },
    }

    return {
      setJson: [createJson],
    }
  }
}
