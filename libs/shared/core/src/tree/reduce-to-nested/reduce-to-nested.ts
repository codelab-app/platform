import { IEdge, IVertex } from '@codelab/shared/abstract/core'
import cytoscape, { EdgeSingular } from 'cytoscape'
import * as R from 'ramda'
import { getEdgeOrder } from '../../cytoscape/edge'
import { getCyElementData } from '../../cytoscape/element'
import { breadthFirstTraversal } from '../breadthFirstTraversal'
import { BfsReduceInput, NodeMapperFn } from '../types'

type Cy = cytoscape.Core

interface ParentChildPair<
  TV extends IVertex = IVertex,
  TE extends IEdge = IEdge,
> {
  parent: TV
  edge: TE
  child: TV
}

interface ProcessedParentChildPair<
  TOut = any,
  TV extends IVertex = IVertex,
  TE extends IEdge = IEdge,
> extends ParentChildPair<TV, TE> {
  parentOut: TOut
  childOut: TOut
}

const getParentChildPair = (e: EdgeSingular): ParentChildPair => {
  const edge = getCyElementData(e) as IEdge
  const parent = getCyElementData(e.source())
  const child = getCyElementData(e.target())

  if (!parent || !child || !edge) {
    throw new Error('Edge data is missing')
  }

  return { child, parent, edge }
}

const getAllChildEdges =
  (cy: Cy) =>
  (v: IVertex): Array<EdgeSingular> =>
    cy
      .getElementById(v.id)
      .outgoers()
      .edges()
      .sort((e1, e2) => getEdgeOrder(e1) - getEdgeOrder(e2))
      .edges()
      .toArray()

const getAllChildPairs = (cy: Cy): ((v: IVertex) => Array<ParentChildPair>) =>
  R.pipe(getAllChildEdges(cy), R.map(getParentChildPair))

const getAllProcessedChildPairs =
  (cy: Cy, mapper: NodeMapperFn) =>
  (parent: IVertex, parentOut: any): Array<ProcessedParentChildPair> => {
    const processPair = (pair: ParentChildPair): ProcessedParentChildPair => ({
      ...pair,
      childOut: mapper(pair.child),
      parentOut, // ensure each child doesn't get a different parent object
    })

    return R.pipe(getAllChildPairs(cy), R.map(processPair))(parent)
  }

export const reduceToNested =
  <TV extends IVertex, TE extends IEdge, TOut>(cy: Cy) =>
  (input: BfsReduceInput<TV, TE, TOut>) => {
    const { nodeMapper, addChildToNode } = input

    const roots = cy
      .elements()
      .roots()
      .map(getCyElementData)
      .filter((v): v is TV => !!v)

    type CurrentParentChildPair = ProcessedParentChildPair<TOut, TV, TE>

    const getAndProcessChildPair: (
      v: TV,
      parentOut: any,
    ) => Array<CurrentParentChildPair> = getAllProcessedChildPairs(
      cy,
      nodeMapper as any, // cast is needed because TVertex != IVertex. Not fixing it because it will make the functions less readable
    ) as any

    const outRoots: Map<string, TOut> = new Map(
      roots.map((r) => [r.id, nodeMapper(r)]),
    )

    const rootPairs: Array<CurrentParentChildPair> = R.pipe(
      R.map((root: TV) => getAndProcessChildPair(root, outRoots.get(root.id))),
      R.flatten,
    )(roots)

    // Can't use cytoscape here because it doesn't support going through the same node twice with different parents
    // or even with the same parent twice - with different edges. This can happen if we have an Interface and an UnionType with the same inner types
    breadthFirstTraversal({
      root: rootPairs,
      allowDuplicates: true,
      visit: ({ parent, edge, child, parentOut, childOut }) => {
        addChildToNode(parentOut, childOut, { parent, child, edge })

        return getAndProcessChildPair(child, childOut)
      },
    })

    return Array.from(outRoots.values())
  }
