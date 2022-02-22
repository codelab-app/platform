import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import { mapValues, merge, pickBy } from 'lodash'
import { DefaultRootState } from 'react-redux'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementGraphFragment,
  HookFragment,
  PropMapBindingFragment,
} from '../../graphql/Element.fragment.v2.graphql.gen'
import { NormalizedGetElementsGraphQuery } from './types'

const fulfilledRequests: Array<string> = []

export const normalizeVertices = (vertices: ElementGraphFragment['vertices']) =>
  vertices.map((v) => ({ [v.id]: v })).reduce(merge, {})

export const normalizeGraph = (graph: ElementGraphFragment) => ({
  vertices: normalizeVertices(graph?.vertices || []),
  edges: graph.edges,
})

export const getGraphEntry = (currentGraphRootId: string) => ({
  variables: { input: { rootId: currentGraphRootId } },
})

const createEdges = (
  created: Array<ElementFragment>,
): Array<ElementEdgeFragment> =>
  created
    .filter((x) => x.parentElement)
    .map(({ id, parentElement, parentElementConnection }) => ({
      // parentElement is defined because of filter
      source: (parentElement as ElementFragment).id,
      target: id,
      order: parentElementConnection.edges[0]?.order,
    }))

const removeEdges = (edges: Array<ElementEdgeFragment>, ids: Array<string>) =>
  edges.filter((x) => !ids.includes(x.source) && !ids.includes(x.target))

const removeEdgesFromParent = (
  edges: Array<ElementEdgeFragment>,
  ids: Array<string>,
) => edges.filter((x) => !ids.includes(x.target))

export const onCreate =
  (created: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.vertices = merge(draft.vertices, normalizeVertices(created))
    draft.edges = draft.edges.concat(createEdges(created))
  }

export const onCreatePropMapBindings =
  (
    created: Array<PropMapBindingFragment>,
  ): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    created.forEach((x) => {
      draft.vertices[x.element.id].propMapBindings?.push(x)
    })
  }

export const onCreateHooks =
  (created: Array<HookFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    created.forEach((x) => {
      draft.vertices[x.element.id].hooks?.push(x)
    })
  }

export const onUpdatePropMapBindings =
  (
    updated: Array<PropMapBindingFragment>,
  ): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    updated.forEach((x) => {
      const propMapBindings = draft.vertices[x.element.id].propMapBindings
        ?.filter((y) => x.id !== y.id)
        .concat([x])

      draft.vertices[x.element.id].propMapBindings = propMapBindings
    })
  }

export const onDeletedPropMapBindings =
  (deletedIds: Array<string>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.vertices = mapValues(draft.vertices, (vertex, key) => ({
      ...vertex,
      propMapBindings: vertex.propMapBindings?.filter(
        (binding) => !deletedIds.includes(binding.id),
      ),
    }))
  }

export const onDeletedHooks =
  (deletedIds: Array<string>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.vertices = mapValues(draft.vertices, (vertex, key) => ({
      ...vertex,
      hooks: vertex.hooks?.filter((hook) => !deletedIds.includes(hook.id)),
    }))
  }

export const onUpdate =
  (updated: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.vertices = merge(draft.vertices, normalizeVertices(updated))
  }

export const onMove =
  (updated: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    const updatedIds = updated.map((x) => x.id)
    draft.vertices = merge(draft.vertices, normalizeVertices(updated))
    draft.edges = removeEdgesFromParent(draft.edges, updatedIds).concat(
      createEdges(updated),
    )
  }

export const onConvertToComponent =
  (updated: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    const updatedIds = updated.map((x) => x.id)
    draft.vertices = merge(draft.vertices, normalizeVertices(updated))
    draft.edges = removeEdges(draft.edges, updatedIds).concat(
      createEdges(updated),
    )
  }

export const onDelete =
  (deletedIds: Array<string>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.edges = removeEdges(draft.edges, deletedIds)
    draft.vertices = pickBy(
      draft.vertices,
      (_, key) => !deletedIds.includes(key),
    )
  }

const getGraphRootId = (getState: () => RootState<any, any, 'api'>) =>
  (getState() as unknown as DefaultRootState).element.currentGraphRootId

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
