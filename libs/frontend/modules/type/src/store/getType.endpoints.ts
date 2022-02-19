import {
  providesAll,
  TYPE_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { api as generatedApi } from '../graphql/get-type.endpoints.v2.graphql.gen'

const providesTagsFactory =
  <T>(typesExtractor: (res: T) => Nullish<Array<EntityLike>>) =>
  (res: T) =>
    providesAll(typesExtractor(res), TYPE_CACHE_TAG)

export const createTypeApi = generatedApi.enhanceEndpoints({
  endpoints: {
    GetAppTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetArrayTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetElementTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetEnumTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetInterfaceTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetLambdaTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetMonacoTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetPageTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetPrimitiveTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetRenderPropsTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetUnionTypes: { providesTags: providesTagsFactory((r) => r?.types) },
    GetInterfaceTypeGraphs: {
      providesTags: providesTagsFactory((r) => r?.types),
    },
    GetInterfaceTypesWithFields: {
      providesTags: providesTagsFactory((r) => r?.types),
    },
  },
})

export { generatedApi as getTypeEndpoints }

export const {
  useGetPrimitiveTypesQuery,
  useGetArrayTypesQuery,
  useGetUnionTypesQuery,
  useGetInterfaceTypesQuery,
  useGetElementTypesQuery,
  useGetRenderPropsTypesQuery,
  useGetEnumTypesQuery,
  useGetLambdaTypesQuery,
  useGetPageTypesQuery,
  useGetAppTypesQuery,
  useGetMonacoTypesQuery,
  useGetInterfaceTypeGraphsQuery,
  useGetInterfaceTypesWithFieldsQuery,
  useLazyGetInterfaceTypeGraphsQuery,
} = generatedApi
