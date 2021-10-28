import { api as generatedApi } from './App.web.graphql.gen'

// will add cache invalidation logic
export const api = generatedApi

export { api as appApi }
export const {
  useGetAppsQuery,
  useLazyGetAppsQuery,
  useGetAppQuery,
  useLazyGetAppQuery,
  useCreateAppMutation,
  useDeleteAppMutation,
  useUpdateAppMutation,
} = api
