import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { TestTagGraphFragment } from '../../domain/tag-graph.fragment.api.graphql.gen'
import { ImportTagsRequest } from './import-tags.request'

/**
 * We take an array of tag graphs and import them, import performs upsert as usual.
 */
@Injectable()
export class ImportTagsService extends DgraphUseCase<ImportTagsRequest, any> {
  constructor(
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
    dgraph: DgraphRepository,
  ) {
    super(dgraph)
  }

  async executeTransaction(request: ImportTagsRequest) {
    const { payload } = request.input
    const tags = JSON.parse(payload)

    // return await this.dgraph.executeMutation(txn, this.createMutation(request))
    await this.createTags(tags)
  }

  private async createTags(tagGraphs: Array<TestTagGraphFragment>) {
    return Promise.all(
      tagGraphs.map(async (tagGraph) => {
        return await this.createTagGraph(tagGraph)
      }),
    )
  }

  private async createTagGraph(tagGraph: TestTagGraphFragment) {
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
