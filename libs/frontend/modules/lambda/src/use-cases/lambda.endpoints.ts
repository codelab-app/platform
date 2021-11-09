import {
  invalidatesAll,
  invalidatesById,
  LAMBDA_CACHE_TAG,
  providesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './lambda.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetLambdas: {
      providesTags: (result) =>
        providesAll(result?.getLambdas, LAMBDA_CACHE_TAG),
    },
    GetLambda: {
      providesTags: (result) =>
        providesById(result?.getLambda?.id, LAMBDA_CACHE_TAG),
    },
    CreateLambda: {
      invalidatesTags: () => invalidatesAll(LAMBDA_CACHE_TAG),
    },
    DeleteLambda: {
      invalidatesTags: () => invalidatesAll(LAMBDA_CACHE_TAG),
    },
    UpdateLambda: {
      invalidatesTags: (result) =>
        invalidatesById(result?.updateLambda?.id, LAMBDA_CACHE_TAG),
    },
  },
})
export { generatedApi as lambdaEndpoints }
export const {
  useCreateLambdaMutation,
  useDeleteLambdaMutation,
  useExecuteLambdaMutation,
  useGetLambdaQuery,
  useLazyGetLambdaQuery,
  useGetLambdasQuery,
  useLazyGetLambdasQuery,
  useUpdateLambdaMutation,
} = generatedApi
