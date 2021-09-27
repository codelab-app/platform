import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { User } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { TestTagGraphFragment } from '../../domain/tag-graph.fragment.graphql.gen'
import { CreateTagService } from '../create-tag'
import { UpsertTagService } from '../upsert-tag'
import { ImportTagsRequest } from './import-tags.request'

/**
 * We take an array of tag graphs and import them, import performs upsert as usual.
 */
@Injectable()
export class ImportTagsService extends DgraphUseCase<ImportTagsRequest, any> {
  constructor(
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
    dgraph: DgraphRepository,
    private createTagService: CreateTagService,
    private upsertTagService: UpsertTagService,
  ) {
    super(dgraph)
  }

  async executeTransaction({ input, currentUser }: ImportTagsRequest) {
    const { payload } = input
    const tags = JSON.parse(payload)

    // return await this.dgraph.executeMutation(txn, this.createMutation(request))
    await this.createTags(tags, currentUser)
  }

  private async createTags(
    tagGraphs: Array<TestTagGraphFragment>,
    currentUser: User,
  ) {
    return Promise.all(
      tagGraphs.map(async (tagGraph) => {
        return await this.createTagGraph(tagGraph, currentUser)
      }),
    )
  }

  private async createTagGraph(
    tagGraph: TestTagGraphFragment,
    currentUser: User,
  ) {
    const { vertices = [], edges = [] } = tagGraph

    /**
     * Create all the root vertices first, then traverse down
     */
    const verticesIdMap = vertices
      .filter((v) => v.isRoot)
      .reduce(async (vertexIdMap, vertex) => {
        const currentVertexId = await this.upsertTagService.execute({
          input: {
            where: {
              name: vertex.name,
            },
            data: vertex,
          },
          currentUser,
        })

        ;(await vertexIdMap).set(vertex.id, currentVertexId)

        return vertexIdMap
      }, Promise.resolve(new Map<string, string>()))

    // await Promise.all(
    //   edge.map((edge) => {
    //     //
    //   }),
    // )

    this.dgraph.transactionWrapper(async (txn) => {
      await this.dgraph.executeMutation(txn, this.createMutation())
    })
  }

  /**
   * Go throughGo through all vertices to create tags, then connect them with edges
   */
  private createMutation() {
    return {}
  }
}
