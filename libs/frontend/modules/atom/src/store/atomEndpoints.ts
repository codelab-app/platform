import {
  ATOMS_CACHE_TAG,
  invalidatesAll,
  providesAll,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/Atom.endpoints.v2.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetAtoms: {
      providesTags: (result) => providesAll(result?.atoms, ATOMS_CACHE_TAG),
    },
    CreateAtoms: {
      invalidatesTags: () => invalidatesAll(ATOMS_CACHE_TAG),
    },
    DeleteAtoms: {
      invalidatesTags: () => invalidatesAll(ATOMS_CACHE_TAG),
    },
    UpdateAtoms: {
      invalidatesTags: (result) =>
        result?.updateAtoms?.atoms.map((r) => ({
          type: ATOMS_CACHE_TAG,
          id: r.id,
        })) ?? [],
    },
  },
})

export { generatedApi as atomEndpoints }
export const {
  useCreateAtomsMutation,
  useUpdateAtomsMutation,
  useDeleteAtomsMutation,
  useGetAtomsQuery,
  useLazyGetAtomsQuery,
} = generatedApi
