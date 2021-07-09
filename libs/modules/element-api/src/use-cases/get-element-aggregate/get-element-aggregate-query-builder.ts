import { DgraphQueryBuilder, DgraphQueryField } from '@codelab/backend'
import { GetPropsQueryBuilder } from '@codelab/modules/prop-api'
import { FlattenRequestItem } from '../flatten-element-tree'

export type GetElementQueryType = FlattenRequestItem & {
  // Need those in DeleteElementService
  'Element.ownedBy'?: GetElementQueryType
  'Page.rootElement'?: GetElementQueryType
}

export class GetElementAggregateQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()

    const getPropsQueryBuilder = new GetPropsQueryBuilder()

    this.withRecurse()
      .withQueryName('query')
      .withFields(...getPropsQueryBuilder.fields)
      .withFields(
        new DgraphQueryField().withName('Element.name'),
        new DgraphQueryField().withName('Element.atom'),
        new DgraphQueryField().withName('Element.props'),
        new DgraphQueryField().withName('Element.css'),
        new DgraphQueryField().withName('Atom.label'),
        new DgraphQueryField().withName('Atom.type'),
        new DgraphQueryField().withName('Atom.propTypes'),
        new DgraphQueryField().withName('Element.children').withFacet('order'),
        // Need those in DeleteElementService:
        new DgraphQueryField().withName('Element.ownedBy'),
        new DgraphQueryField().withName('Page.rootElement'),
      )
  }
}
