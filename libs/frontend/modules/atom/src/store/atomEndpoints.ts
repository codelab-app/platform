import {
  ATOMS_CACHE_TAG,
  invalidatesAll,
  invalidatesById,
  providesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/Atom.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    ExportAtoms: {
      providesTags: (result) => providesAll(result?.getAtoms, ATOMS_CACHE_TAG),
    },
    GetAtoms: {
      providesTags: (result) => providesAll(result?.getAtoms, ATOMS_CACHE_TAG),
    },
    GetAtom: {
      providesTags: (result) =>
        providesById(result?.getAtom?.id, ATOMS_CACHE_TAG),
    },
    CreateAtom: {
      invalidatesTags: () => invalidatesAll(ATOMS_CACHE_TAG),
    },
    DeleteAtom: {
      invalidatesTags: () => invalidatesAll(ATOMS_CACHE_TAG),
    },
    UpdateAtom: {
      invalidatesTags: (result) =>
        invalidatesById(result?.updateAtom?.id, ATOMS_CACHE_TAG),
    },
    ImportAtoms: {
      invalidatesTags: () => invalidatesAll(ATOMS_CACHE_TAG),
    },
  },
})
export { generatedApi as atomEndpoints }
export const {
  useCreateAtomMutation,
  useDeleteAtomMutation,
  useExportAtomsQuery,
  useLazyExportAtomsQuery,
  useGetAtomQuery,
  useLazyGetAtomQuery,
  useGetAtomsQuery,
  useLazyGetAtomsQuery,
  useImportAtomsMutation,
  useUpdateAtomMutation,
} = generatedApi
