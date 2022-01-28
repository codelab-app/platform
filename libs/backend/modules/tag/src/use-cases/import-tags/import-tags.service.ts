import { UseCasePort } from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { TreeProvider, TreeTokens } from '@codelab/backend/shared/generic'
import { IUser } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TestTagGraphFragment } from '../../test/graphql/tag-graph.fragment.graphql.gen'
import { CreateTagService } from '../create-tag'
import { UpsertTagService } from '../upsert-tag'
import { ImportTagsRequest } from './import-tags.request'

/**
 * We take an array of tag graphs and import them, import performs upsert as usual.
 */
@Injectable()
export class ImportTagsService
  extends DgraphUseCase<ImportTagsRequest>
  implements UseCasePort<ImportTagsRequest, void>
{
  constructor(
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
    dgraph: DgraphRepository,
    private createTagService: CreateTagService,
    private upsertTagService: UpsertTagService,
    @Inject(TreeTokens.Service)
    private treeProvider: TreeProvider,
  ) {
    super(dgraph)
  }

  async executeTransaction({ input, currentUser }: ImportTagsRequest) {
    const { payload } = input
    const tagGraph = JSON.parse(payload)

    await this.createTags(tagGraph, currentUser)
  }

  private async createTags(tagGraph: TestTagGraphFragment, currentUser: IUser) {
    return await this.createTagGraph(tagGraph, currentUser)
  }

  private async createTagGraph(
    tagGraph: TestTagGraphFragment,
    currentUser: IUser,
  ) {
    const operations: Array<(_: Map<string, string>) => Promise<any>> = []
    /**
     * This creates a Cytoscape tree/graph object, so we can use BFS on it
     */
    const treeService = this.treeProvider(tagGraph)

    /**
     * BFS should always be called instead of manually looping through descendants
     */
    treeService.bfsVisit((v, e, u, i, depth) => {
      const vertex = v?.data()
      const edge = e?.data()
      const parent = u?.data()

      /**
       * Queue up promise operations for later
       *
       * Since the traversal is using old id, we'll need to map that to new id's
       *
       * We use the traversal to build up our map here
       */
      operations.push(async (_vertexIdsMap: Map<string, string>) => {
        const { id } = await this.upsertTagService.execute({
          input: {
            where: { name: vertex.name },
            data: {
              name: vertex.name,
              parentTagId: parent ? _vertexIdsMap.get(parent.id) : undefined,
            },
          },
          currentUser,
        })

        _vertexIdsMap.set(vertex.id, id)

        return _vertexIdsMap
      })
    })

    /**
     * We build up the vertex ids map as we call each operation
     */
    return operations.reduce(async (_vertexIdsMap, operation) => {
      return await operation(await _vertexIdsMap)
    }, Promise.resolve(new Map<string, string>()))
  }
}
