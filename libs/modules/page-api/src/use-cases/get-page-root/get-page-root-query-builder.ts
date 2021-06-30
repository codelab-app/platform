import { DgraphQueryField } from '@codelab/backend'
import { GetPageElementRootQueryBuilder } from '@codelab/modules/page-element-api'

export class GetPageRootQueryBuilder extends GetPageElementRootQueryBuilder {
  constructor() {
    super()
    this.withFields(
      new DgraphQueryField().withName('Page.rootElement'),
    ).withQueryName('query')
  }
}
