import { Selection } from 'd3'
import { D3Link } from '../Graph.i'

export type LinkHandlers = {
  onClick: (...args: any) => any
}

export const LINK_PATH_CLASS = 'Link-path'
export const LINK_HOVER_CLASS = 'Link-hover'
export const LINK_LABEL_CLASS = 'Link-label'

// Parent could be any time
export type LinkSelection = Selection<SVGGElement, D3Link, any, D3Link>

export type LinkAttribute = {
  distance: number
  color: string
}
