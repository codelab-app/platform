import { api as generatedApi } from '../graphql/prop-map-binding.endpoints.v2.graphql.gen'

export const propMapBindingApi = generatedApi

export { generatedApi as propMapBindingEndpoints }

export const {
  useCreatePropMapBindingsMutation,
  useUpdatePropMapBindingsMutation,
  useDeletePropMapBindingsMutation,
  useGetPropMapBindingsQuery,
} = generatedApi
