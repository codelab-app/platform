import { Nullable } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { useMemo } from 'react'
import { TypeGraphFragment } from '../graphql/fragments/TypeGraph.fragment.v2.graphql.gen'
// import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.graphql.gen'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: Nullable<TypeGraphFragment>) =>
  useMemo(() => new TypeTree(graph ?? { edges: [], vertices: [] }), [graph])
