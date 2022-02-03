import {
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/create-type.endpoints.v2.graphql.gen'

const common = {
  invalidatesTags: () => [TYPE_GRAPH_CACHE_TAG, TYPE_CACHE_TAG],
}

export const createTypeEndpoints = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateAppTypes: { ...common },
    CreateArrayTypes: { ...common },
    CreateElementTypes: { ...common },
    CreateEnumTypes: { ...common },
    CreateInterfaceTypes: { ...common },
    CreateLambdaTypes: { ...common },
    CreateMonacoTypes: { ...common },
    CreatePageTypes: { ...common },
    CreatePrimitiveTypes: { ...common },
    CreateRenderPropsTypes: { ...common },
    CreateUnionTypes: { ...common },
  },
})

export const {
  useCreatePrimitiveTypesMutation,
  useCreateArrayTypesMutation,
  useCreateUnionTypesMutation,
  useCreateInterfaceTypesMutation,
  useCreateElementTypesMutation,
  useCreateRenderPropsTypesMutation,
  useCreateEnumTypesMutation,
  useCreateLambdaTypesMutation,
  useCreatePageTypesMutation,
  useCreateAppTypesMutation,
  useCreateMonacoTypesMutation,
} = createTypeEndpoints
