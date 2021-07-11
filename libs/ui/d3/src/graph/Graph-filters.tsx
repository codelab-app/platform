import { activeState } from './variables/Graph-variables'

type GraphFilter<T> = (element: T) => boolean

export const activeNodes: GraphFilter<any> = (node) =>
  node.id === activeState.node.id

export const nonActiveNodes: GraphFilter<any> = (node) =>
  node.id !== activeState.node.id

export const nonActiveLinks: GraphFilter<any> = (link) =>
  link.id !== activeState.link.id

export const IDMatcher = (d: any) => d.id
