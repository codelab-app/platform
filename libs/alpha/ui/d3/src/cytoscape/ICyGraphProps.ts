import { ElementsDefinition } from 'cytoscape'

export interface ICyGraphProps {
  elements: ElementsDefinition
  endpoint?: string | undefined
}

export interface ISrcTarget {
  source: string
  target: string
}
