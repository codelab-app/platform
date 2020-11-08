export interface EdgeI {
  label?: string
  start: string
  end: string
}

export interface EdgeA extends EdgeI {
  id: string
}

export interface IEdge extends EdgeA {
  test?: any
}
