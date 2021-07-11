import { BaseType, ValueFn } from 'd3-selection'
import { LinkType, NodeType } from '../Graph.i'

type NodeAttributesMap = (
  color: string,
  radius: number,
  distance: number,
) => (type: NodeType) => NodeTypeMap

type NodeTypeMap = {
  [type: string]: NodeAttribute
}

export type NodeAttribute = {
  color: string
  radius: number
  distance: number
}

const nodeAttributes: NodeAttributesMap =
  (color, radius, distance) => (type) => ({
    [type]: {
      color,
      radius,
      distance,
    },
  })

type LinkAttributesMap = (
  color: string,
  distance: number,
) => (linkType: LinkType) => LinkTypeMap

type LinkTypeMap = {
  [linkType: string]: LinkAttribute
}

export type LinkAttribute = {
  distance: number
  color: string
}

const linkAttributes: LinkAttributesMap = (color, distance) => (linkType) => ({
  [linkType]: {
    color,
    distance,
  },
})

// const nodeAttributes = (type: NodeType) => {
//   color, radius, distance
// }

export const g = {
  /**
   * Graph
   */
  svg: {},
  // width: 600,
  // height: 600,
  /**
   * Nodes
   */
  activeNode: { id: '' },

  // Color
  activeNodeColor: 'orange',
  vertexRadius: 10,

  labelOffset: 10,

  node: {
    ...nodeAttributes('blue', 10, 50)(NodeType.User),
    ...nodeAttributes('black', 10, 50)(NodeType.App),
    ...nodeAttributes('grey', 10, 50)(NodeType.Page),
    ...nodeAttributes('blue', 10, 50)(NodeType.Element),
    ...nodeAttributes('green', 10, 50)(NodeType.Component),
    // ...nodeAttributes('lightgreen', 4, 50)(NodeType.Query),
    // ...nodeAttributes('purple', 4, 50)(NodeType.Content),
    ...nodeAttributes('grey', 10, 50)(NodeType.Default),
  },

  link: {
    ...linkAttributes('grey', 50)(LinkType.Field),
    ...linkAttributes('grey', 50)(LinkType.Content),
    ...linkAttributes('grey', 50)(LinkType.Data),
    ...linkAttributes('grey', 50)(LinkType.Default),
  },

  /**
   * links
   */
  activeLink: { id: '' },
  activeLinkColor: 'orange',
}

export type GetNodeAttribute<GElement extends BaseType, Datum> = (
  attr: keyof NodeAttribute,
) => ValueFn<GElement, Datum, string | number | boolean | null>

export const nodeAttribute: GetNodeAttribute<any, any> = (attr) => (d) => {
  const typename = d?.type ?? NodeType.Default

  console.log(d, typename, g.node[typename][attr])

  return g.node[typename][attr]
}

export type GetLinkAttribute<
  GElement extends BaseType,
  Datum,
  Results = string | number,
> = (attr: keyof LinkAttribute) => ValueFn<GElement, Datum, Results>

export const linkAttribute: GetLinkAttribute<any, any> = (attr) => (d) => {
  const typename = d?.type as LinkType

  return g.link[typename]?.[attr] || g.link[LinkType.Default][attr]
}
