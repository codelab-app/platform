import * as Types from '@codelab/shared/abstract/codegen-v2'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementWithGraphFragment,
} from '../../graphql'

export type GraphUpdateHandler = Recipe<GetElementsWithGraphQuery>

export type GetElementsWithGraphQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type NormalizedGraph = {
  vertices: {
    [id: ElementFragment['id']]: ElementFragment
  }
  edges: Array<ElementEdgeFragment>
}

export type GetElementsWithGraphQuery = {
  elements: {
    [id: ElementWithGraphFragment['id']]: NormalizedGraph
  }
}
