import { AtomType } from './Hasura'

export interface NodeA {
  id: string
  type: AtomType
  props: object
  children: Array<NodeA>
}
