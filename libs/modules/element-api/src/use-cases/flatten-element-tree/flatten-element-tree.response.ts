import { Atom } from '@codelab/modules/atom-api'
import { Element, ElementLink } from '../../models'

export class FlattenElementTreeResponse {
  declare descendants: Array<Element>

  declare links: Array<ElementLink>

  declare rootAtom?: Atom | null
}
