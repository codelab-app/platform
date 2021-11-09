import {
  ELEMENT_CACHE_TAG,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/hook.endpoints.graphql.gen'

export const hookApi = generatedApi.enhanceEndpoints({
  endpoints: {
    AddHookToElement: {
      invalidatesTags: (result, _, args) =>
        providesById(args.variables?.input.elementId, ELEMENT_CACHE_TAG),
    },
    GetLambdaName: {
      //
    },
    RemoveHookFromElement: {
      invalidatesTags: (result, _, args) => [
        providesById(args.variables?.input.elementId, ELEMENT_CACHE_TAG)[0],
      ],
    },
  },
})

export { generatedApi as hookEndpoints }

export const {
  useAddHookToElementMutation,
  useGetLambdaNameQuery,
  useLazyGetLambdaNameQuery,
  useRemoveHookFromElementMutation,
} = generatedApi
