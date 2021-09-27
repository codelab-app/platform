import { DgraphUseCase } from '@codelab/backend/application'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { ImportTagsRequest } from './import-tags.request'

/**
 * We take an array of tag graphs and import them, import performs upsert as usual.
 */
@Injectable()
export class ImportTagsService extends DgraphUseCase<ImportTagsRequest, any> {
  protected async executeTransaction(request: ImportTagsRequest, txn: Txn) {
    return await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private createMutation(request: ImportTagsRequest): Mutation {
    const { payload } = request.input

    console.log(payload)

    return {}
  }
}
