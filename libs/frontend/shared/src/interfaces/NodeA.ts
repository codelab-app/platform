import { AtomType } from './Hasura'

export interface NodeA {
  id: string
  type: AtomType
  props?: Record<string, unknown>
  children: Array<NodeA>
}

export interface NodeI {
  id?: string
  type: AtomType
  props?: Record<string, unknown>
  children?: Array<NodeI>
}
