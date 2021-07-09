import { DgraphQueryBuilder } from '@codelab/backend'
import { GetElementAggregateQueryBuilder } from '@codelab/modules/element-api'

export class GetPageRootQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    const elementAggregateQuery = new GetElementAggregateQueryBuilder()

    this.withRecurse().withFields(...elementAggregateQuery.fields)
  }
}
