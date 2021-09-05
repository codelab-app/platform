import { AtomType } from '../enums'

export interface IAtom {
  id: string

  type: AtomType

  name: string

  // api?: DgraphInterfaceType
  // declare tags?: Array<Tag>
}
