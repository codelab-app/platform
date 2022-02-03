import {
  invalidatesByIds,
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { api as generatedApi } from '../graphql/update-type.endpoints.v2.graphql.gen'

const invalidateUpdates =
  <T>(typesExtractor: (res: T) => Nullish<Array<EntityLike>>) =>
  (res: T) =>
    invalidatesByIds(typesExtractor(res), TYPE_CACHE_TAG, TYPE_GRAPH_CACHE_TAG)

export const updateTypeEndpoints = generatedApi.enhanceEndpoints({
  endpoints: {
    UpdateAppTypes: {
      invalidatesTags: invalidateUpdates((r) => r?.updateAppTypes.appTypes),
    },
    UpdateArrayTypes: {
      invalidatesTags: invalidateUpdates((r) => r?.updateArrayTypes.arrayTypes),
    },
    UpdateElementTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updateElementTypes.elementTypes,
      ),
    },
    UpdateEnumTypes: {
      invalidatesTags: invalidateUpdates((r) => r?.updateEnumTypes.enumTypes),
    },
    UpdateInterfaceTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updateInterfaceTypes.interfaceTypes,
      ),
    },
    UpdateLambdaTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updateLambdaTypes.lambdaTypes,
      ),
    },
    UpdateMonacoTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updateMonacoTypes.monacoTypes,
      ),
    },
    UpdatePageTypes: {
      invalidatesTags: invalidateUpdates((r) => r?.updatePageTypes.pageTypes),
    },
    UpdatePrimitiveTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updatePrimitiveTypes.primitiveTypes,
      ),
    },
    UpdateRenderPropsTypes: {
      invalidatesTags: invalidateUpdates(
        (r) => r?.updateRenderPropsTypes.renderPropsTypes,
      ),
    },
    UpdateUnionTypes: {
      invalidatesTags: invalidateUpdates((r) => r?.updateUnionTypes.unionTypes),
    },
  },
})

export const {
  useUpdatePrimitiveTypesMutation,
  useUpdateArrayTypesMutation,
  useUpdateUnionTypesMutation,
  useUpdateInterfaceTypesMutation,
  useUpdateElementTypesMutation,
  useUpdateRenderPropsTypesMutation,
  useUpdateEnumTypesMutation,
  useUpdateLambdaTypesMutation,
  useUpdatePageTypesMutation,
  useUpdateAppTypesMutation,
  useUpdateMonacoTypesMutation,
} = updateTypeEndpoints
