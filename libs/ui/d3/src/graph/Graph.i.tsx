import { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import { Canvas } from '../Canvas.i'
import { LinkHandlers } from './links/Graph-links'
import { NodeHandlers } from './nodes/Graph-nodes'

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

interface D3Base {
  id: string
  label?: string
}

export interface D3Node extends D3Base, SimulationNodeDatum {
  type?: NodeType
  color?: string
}

export interface D3Link extends D3Base, SimulationLinkDatum<D3Node> {}

export type D3GraphProps = {
  nodes: Array<D3Node>
  links: Array<D3Link>
  onNodeClick?: ReturnType<NodeHandlers['onClick']>
  onLinkClick?: ReturnType<LinkHandlers['onClick']>
} & Canvas
