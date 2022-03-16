import * as cg from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { flatMap } from 'lodash'
import { TypeFragment } from '../graphql'
import { getTypeEndpoints } from '../store/getType.endpoints'

type AllTypesOptions = cg.AppTypeOptions &
  cg.ArrayTypeOptions &
  cg.ElementTypeOptions &
  cg.EnumTypeOptions &
  cg.InterfaceTypeOptions &
  cg.LambdaTypeOptions &
  cg.MonacoTypeOptions &
  cg.PageTypeOptions &
  cg.PrimitiveTypeOptions &
  cg.ReactNodeTypeOptions &
  cg.RenderPropsTypeOptions &
  cg.UnionTypeOptions

type AllTypesWhere = cg.AppTypeWhere &
  cg.ArrayTypeWhere &
  cg.ElementTypeWhere &
  cg.EnumTypeWhere &
  cg.InterfaceTypeWhere &
  cg.LambdaTypeWhere &
  cg.MonacoTypeWhere &
  cg.PageTypeWhere &
  cg.PrimitiveTypeWhere &
  cg.ReactNodeTypeWhere &
  cg.RenderPropsTypeWhere &
  cg.UnionTypeWhere

export type BaseTypeResponse = { types: Array<TypeFragment> }

export interface UseGetAllTypesInput {
  options?: Nullish<AllTypesOptions>
  where?: Nullish<AllTypesWhere>
}

// I'm not sure where to get the proper type for this, but this is all we need for now
export interface UseGetAllTypes {
  data?: BaseTypeResponse
  isLoading: boolean
  error?: any
}

// Neo4j provides us with a way to query each individual type but not all of them at once.
// This hook queries all individual types and when all of them are fetched - combines them into a single array
export const useGetAllTypesQuery = ({
  where,
  options,
}: UseGetAllTypesInput = {}): UseGetAllTypes => {
  const input = { variables: { where, options } }

  const allResults: Array<UseGetAllTypes> = [
    getTypeEndpoints.useGetElementTypesQuery(input),
    getTypeEndpoints.useGetArrayTypesQuery(input),
    getTypeEndpoints.useGetUnionTypesQuery(input),
    getTypeEndpoints.useGetEnumTypesQuery(input),
    getTypeEndpoints.useGetLambdaTypesQuery(input),
    getTypeEndpoints.useGetPageTypesQuery(input),
    getTypeEndpoints.useGetAppTypesQuery(input),
    getTypeEndpoints.useGetMonacoTypesQuery(input),
    getTypeEndpoints.useGetInterfaceTypesWithFieldsQuery(input),
    getTypeEndpoints.useGetPrimitiveTypesQuery(input),
    getTypeEndpoints.useGetRenderPropsTypesQuery(input),
    getTypeEndpoints.useGetReactNodeTypesQuery(input),
  ]

  const allTypes = flatMap(allResults, (r) => r.data?.types ?? [])
  const isLoading = allResults.some((r) => r.isLoading)

  return {
    data: { types: allTypes },
    isLoading,
    error: allResults.find((r) => r.error),
  }
}
