import { Vertex } from '@codelab/shared/abstract/core'
import { IAtom } from './IAtom'

/**
 * The interface required by ElementTree to function
 *
 * Keeping the port interfaces here allows us to use this in both
 * frontend (with fragments) and backend (with entities or models)
 */
export interface IElementVertex extends Vertex {
  css?: string | null
  atom?: IAtom | null
  // props: string

  // hooks: Array<HookModel>
}
