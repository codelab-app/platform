import {
  GetPageElementQueryType,
  GetPageElementRootQueryBuilder,
} from '@codelab/modules/page-element-api'
import { z } from 'zod'

interface GetPageRootQueryType extends GetPageElementQueryType {
  'Page.rootElement'?: GetPageRootQueryType
}

export class GetPageRootQueryBuilder extends GetPageElementRootQueryBuilder {
  constructor() {
    super()
    this.withFields('Page.rootElement').withQueryName('query')
  }

  public getZodSchema() {
    const root: z.ZodSchema<GetPageRootQueryType> = z.lazy(() =>
      z.object({
        uid: z.string(),
        'dgraph.type': z.array(z.string()),
        'PageElement.name': z.string().optional(),
        'PageElement.atom': root.optional(),
        'PageElement.children': z.array(root).optional(),
        'PageElement.children|order': z.number().optional(),
        'Atom.label': z.string().optional(),
        'Atom.type': z.string().optional(),
        'Page.rootElement': root.optional(),
      }),
    )

    return z.object({
      query: z.array(root),
    })
  }
}
