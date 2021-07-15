import { DgraphQueryBuilder } from '@codelab/backend'
import { GetElementAggregateQuery } from '@codelab/modules/element-api'

export class GetPageRootQuery extends DgraphQueryBuilder {
  constructor() {
    super()

    const elementAggregateQuery = new GetElementAggregateQuery()

    this.withRecurse().withFields(...elementAggregateQuery.fields)
  }
}
