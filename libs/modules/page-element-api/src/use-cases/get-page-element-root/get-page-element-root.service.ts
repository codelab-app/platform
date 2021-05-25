import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { PageElement } from '../../pageElement.model'
import { GetPageElementRootInput } from './GetPageElementRootInput'

@Injectable()
export class GetPageElementRootService extends DgraphUseCase<
  GetPageElementRootInput,
  PageElement
> {
  constructor(dgraph: DGraphService) {
    super(dgraph)
  }

  async execute(request: GetPageElementRootInput, txn: Txn) {
    return (await Promise.resolve({})) as Promise<PageElement>
  }
}
