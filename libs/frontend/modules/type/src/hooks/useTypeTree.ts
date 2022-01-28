import { ITypeGraph } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { useMemo } from 'react'
import { TypeGraphFragment } from '../graphql/TypeGraph.fragment.graphql.gen'

/**
 * Parses a TypeGraph and provides helper methods for it
 */
export const useTypeTree = (graph?: Nullable<TypeGraphFragment>) =>
  useMemo(
    // Cast is needed because we can't differentiate between different specific types in Graphql by typeKind
    () => new TypeTree((graph as ITypeGraph) ?? { edges: [], vertices: [] }),
    [graph],
  )
