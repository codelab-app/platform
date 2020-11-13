import { EntityA, EntityI } from '@codelab/shared/interface/entity'

export interface EdgeI extends EntityI {
  label?: string
  start: string
  end: string
}

export interface EdgeA extends EntityA {
  id: string
  label?: string
  start: string
  end: string
}

export interface IEdge extends EdgeA {
  test?: any
}
