import { HierarchyPointLink } from 'd3'
import { Canvas } from '../Canvas.i'
import { NodeType } from '../graph'

export type D3TreeData = {
  label: string
  type?: NodeType
  value?: string | number
  children?: Array<D3TreeData>
}

export type D3TreeProps = {
  data: D3TreeData
} & Canvas

export type D3TreeLink = HierarchyPointLink<any>
