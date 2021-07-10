import { g } from './variables/Graph-variables'

type GraphFilter<T> = (element: T) => boolean

export const activeNodes: GraphFilter<any> = (node) =>
  node.id === g.activeNode.id

export const nonActiveNodes: GraphFilter<any> = (node) =>
  node.id !== g.activeNode.id

export const nonActiveLinks: GraphFilter<any> = (link) =>
  link.id !== g.activeLink.id

export const IDMatcher = (d: any) => d.id
