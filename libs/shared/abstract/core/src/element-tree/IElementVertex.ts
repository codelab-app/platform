import { IAtom } from '../atom/IAtom'
import { Vertex } from '../graph/vertex'

export interface IElementVertex extends Vertex {
  css?: string | null
  atom?: IAtom | null
  // props: string

  // hooks: Array<HookModel>

  renderForEachPropKey?: string | null
  renderIfPropKey?: string | null
}
