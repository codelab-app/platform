export interface INodeType<
  Type extends ELEMENT_NODE_TYPE | COMPONENT_NODE_TYPE,
> {
  __nodeType: Type
}

export const ELEMENT_NODE_TYPE = 'Element'

export type ELEMENT_NODE_TYPE = typeof ELEMENT_NODE_TYPE

export const COMPONENT_NODE_TYPE = 'Component'

export type COMPONENT_NODE_TYPE = typeof COMPONENT_NODE_TYPE
