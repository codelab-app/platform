import { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'

export enum NodeType {
  User = 'User',
  App = 'App',
  Page = 'Page',
  Component = 'Component',
  Element = 'Element',
  Default = 'Default',
}

export enum LinkType {
  Field = 'Field',
  Content = 'Content',
  Data = 'Data',
  Query = 'Query',
  Default = 'Default',
}

export interface D3NodeProp {
  id: string
}

export interface D3Node extends D3NodeProp, SimulationNodeDatum {
  type?: string
  label?: string
  color?: string
}

export interface D3LinkProp {
  id: string
}

export interface D3Link extends D3LinkProp, SimulationLinkDatum<D3Node> {
  label?: string
}

export type D3GraphProps = {
  width?: number
  height?: number
  nodes: Array<D3Node>
  links: Array<D3Link>
  onNodeClick?: () => any
  onLinkClick?: () => any
}
