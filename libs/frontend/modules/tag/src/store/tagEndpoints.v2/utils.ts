import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { merge } from 'lodash'
import { DefaultRootState } from 'react-redux'
import { TagFragment } from '../../graphql/Tag.fragment.v2.graphql.gen'
import { TagEdgeFragment } from '../../graphql/TagEdge.fragment.v2.graphql.gen'
import { TagGraphFragment } from '../../graphql/TagGraph.fragment.v2.graphql.gen'
import { GraphUpdateHandler } from './types'

const fulfilledRequests: Array<string> = []

export const normalizeVertices = (vertices: TagGraphFragment['vertices']) =>
  vertices.map((v) => ({ [v.id]: v })).reduce(merge, {})

// export const normalizeElement = (element: ElementWithGraphFragment) => ({
//   [element.id]: {
//     vertices: normalizeVertices(element.graph?.vertices || []),
//     edges: element.graph?.edges,
//   },
// })

const createEdges = (created: Array<TagFragment>): Array<TagEdgeFragment> =>
  created
    // .filter((x) => x.parent)
    .map((e) => ({
      // parentElement is defined because of filter
      source: (e as TagFragment).id,
      target: e.id,
    }))

const removeEdges = (edges: Array<TagEdgeFragment>, ids: Array<string>) =>
  edges.filter((x) => !ids.includes(x.source) && !ids.includes(x.target))

export const getGraphEntry = (currentGraphRootId: string) => ({
  variables: { where: { id: currentGraphRootId } },
})

export const onUpdate =
  (rootId: string, updated: Array<TagFragment>): GraphUpdateHandler =>
  (draft) => {
    const oldGraph = draft.tags[rootId]
    const updatedIds = updated.map((x) => x.id)

    draft.tags[rootId] = {
      vertices: merge(oldGraph.vertices, normalizeVertices(updated)),
      edges: removeEdges(oldGraph.edges, updatedIds).concat(
        createEdges(updated),
      ),
    }
  }

const getGraphRootId = (getState: () => RootState<any, any, 'api'>) =>
  (getState() as unknown as DefaultRootState).tag.updateId

export const runGuards = (
  requestId: string,
  getState: () => RootState<any, any, 'api'>,
  callback: (rootId: string) => void,
) => {
  if (fulfilledRequests.includes(requestId)) {
    return
  }

  const currentGraphRootId = getGraphRootId(getState)

  if (!currentGraphRootId) {
    console.log('Graph cache is not updated, Graph root is not provided')

    return
  }

  callback(currentGraphRootId)
  fulfilledRequests.push(requestId)
}
