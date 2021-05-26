import { DgraphQueryBuilder } from '@codelab/backend'
import { z } from 'zod'
import { FlattenRequestItem } from '../flatten-page-element-tree'

export type GetPageElementQueryType = FlattenRequestItem

export class GetPageElementRootQueryBuilder extends DgraphQueryBuilder {
  constructor() {
    super()
    this.withRecurse()
      .withQueryName('query')
      .withFields(
        `
        uid
        dgraph.type
        PageElement.name
        PageElement.atom
        Atom.label
        Atom.type
        PageElement.children @facets(order)
    `,
      )
  }

  public getZodSchema() {
    const root: z.ZodSchema<GetPageElementQueryType> = z.lazy(() =>
      z.object({
        uid: z.string(),
        'dgraph.type': z.array(z.string()),
        'PageElement.name': z.string().optional(),
        'PageElement.atom': root.optional(),
        'PageElement.children': z.array(root).optional(),
        'PageElement.children|order': z
          .number()
          .or(z.record(z.number()))
          .optional(), //in recursive reverse edges, this will be object
        'Atom.label': z.string().optional(),
        'Atom.type': z.string().optional(),
      }),
    )

    return z.object({
      query: z.array(root),
    })
  }
}
