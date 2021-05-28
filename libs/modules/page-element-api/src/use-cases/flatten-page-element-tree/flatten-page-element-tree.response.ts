import { Atom } from '@codelab/modules/atom-api'
import { PageElement, PageElementLink } from '../../models'

export class FlattenPageElementTreeResponse {
  declare descendants: Array<PageElement>

  declare links: Array<PageElementLink>

  declare rootAtom?: Atom | null
}
