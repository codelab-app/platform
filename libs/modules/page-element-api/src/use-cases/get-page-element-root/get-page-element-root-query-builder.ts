import { DgraphQueryBuilder, DgraphQueryField } from '@codelab/backend'
import { GetPropsQueryBuilder } from '@codelab/modules/prop-api'
import { FlattenRequestItem } from '../flatten-page-element-tree'

export type GetPageElementQueryType = FlattenRequestItem

export class GetPageElementRootQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    const getPropsQueryBuilder = new GetPropsQueryBuilder()

    this.withRecurse()
      .withQueryName('query')
      .withFields(...getPropsQueryBuilder.fields)
      .withFields(
        new DgraphQueryField().withName('PageElement.name'),
        new DgraphQueryField().withName('PageElement.atom'),
        new DgraphQueryField().withName('PageElement.props'),
        new DgraphQueryField().withName('PageElement.css'),
        new DgraphQueryField().withName('Atom.label'),
        new DgraphQueryField().withName('Atom.type'),
        new DgraphQueryField().withName('Atom.propTypes'),
        new DgraphQueryField()
          .withName('PageElement.children')
          .withFacet('order'),
      )
  }
}
