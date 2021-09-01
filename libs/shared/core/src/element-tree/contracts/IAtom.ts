import { AtomType } from '@codelab/shared/enums'

/**
 * The interface required by ElementTree to function
 *
 * Keeping the port interfaces here allows us to use this in both
 * frontend (with fragments) and backend (with entities or models)
 */
export interface IAtom {
  id: string

  type: AtomType

  name: string

  // api?: DgraphInterfaceType
  // declare tags?: Array<Tag>
}
