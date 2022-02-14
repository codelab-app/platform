import * as Types from '@codelab/shared/abstract/codegen-v2'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import { TagFragment } from '../../graphql/Tag.fragment.v2.graphql.gen'
import { TagEdgeFragment } from '../../graphql/TagEdge.fragment.v2.graphql.gen'

export type GraphUpdateHandler = Recipe<GetTagsWithGraphQuery>

export type GetElementsWithGraphQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type NormalizedGraph = {
  vertices: {
    [id: TagFragment['id']]: TagFragment
  }
  edges: Array<TagEdgeFragment>
}

export type GetTagsWithGraphQuery = {
  tags: {
    [id: TagFragment['id']]: NormalizedGraph
  }
}
