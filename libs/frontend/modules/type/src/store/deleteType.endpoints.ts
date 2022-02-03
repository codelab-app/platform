import {
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/delete-type.endpoints.v2.graphql.gen'

const common = {
  invalidatesTags: () => [TYPE_GRAPH_CACHE_TAG, TYPE_CACHE_TAG],
}

export const deleteTypeApi = generatedApi.enhanceEndpoints({
  endpoints: {
    DeleteAppTypes: { ...common },
    DeleteArrayTypes: { ...common },
    DeleteElementTypes: { ...common },
    DeleteEnumTypes: { ...common },
    DeleteInterfaceTypes: { ...common },
    DeleteLambdaTypes: { ...common },
    DeleteMonacoTypes: { ...common },
    DeletePageTypes: { ...common },
    DeletePrimitiveTypes: { ...common },
    DeleteRenderPropsTypes: { ...common },
    DeleteUnionTypes: { ...common },
  },
})

export { generatedApi as deleteTypeEndpoints }

export const {
  useDeletePrimitiveTypesMutation,
  useDeleteArrayTypesMutation,
  useDeleteUnionTypesMutation,
  useDeleteInterfaceTypesMutation,
  useDeleteElementTypesMutation,
  useDeleteRenderPropsTypesMutation,
  useDeleteEnumTypesMutation,
  useDeleteLambdaTypesMutation,
  useDeletePageTypesMutation,
  useDeleteAppTypesMutation,
  useDeleteMonacoTypesMutation,
} = generatedApi
