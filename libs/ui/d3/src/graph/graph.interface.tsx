import { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force'
import { Canvas } from '../Canvas.i'

export enum NodeType {
  User = 'User',
  App = 'App',
  Page = 'Page',
  Component = 'Component',
  Atom = 'Atom',
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

export interface D3Base {
  id: string
  label?: string
}

export interface D3Node extends D3Base, SimulationNodeDatum {
  type?: NodeType
  color?: string
}

export interface D3Link extends D3Base, SimulationLinkDatum<D3Node> {}

export type LinkHandlers = {
  onClick: (...args: any) => any
}

export type NodeHandlers = {
  onClick: (...args: any) => any
}

export type D3GraphProps = {
  nodes: Array<D3Node>
  links: Array<D3Link>
  onNodeClick?: ReturnType<NodeHandlers['onClick']>
  onLinkClick?: ReturnType<LinkHandlers['onClick']>
} & Canvas
