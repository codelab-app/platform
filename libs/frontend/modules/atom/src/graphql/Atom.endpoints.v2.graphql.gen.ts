import * as Types from '@codelab/shared/abstract/codegen-v2'

import { AtomFragment } from './Atom.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { AtomFragmentDoc } from './Atom.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateAtomsMutationVariables = Types.Exact<{
  input: Array<Types.AtomCreateInput> | Types.AtomCreateInput
}>

export type CreateAtomsMutation = {
  createAtoms: {
    info: { nodesCreated: number; relationshipsCreated: number }
    atoms: Array<AtomFragment>
  }
}

export type DeleteAtomsMutationVariables = Types.Exact<{
  where: Types.AtomWhere
}>

export type DeleteAtomsMutation = {
  deleteAtoms: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetAtomsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>
  options?: Types.InputMaybe<Types.AtomOptions>
}>

export type GetAtomsQuery = { atoms: Array<AtomFragment> }

export type ImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput
}>

export type ImportAtomsMutation = {
  importAtoms?: { atoms: Array<{ id: string }> } | null
}

export type UpdateAtomsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>
  update?: Types.InputMaybe<Types.AtomUpdateInput>
}>

export type UpdateAtomsMutation = {
  updateAtoms: { atoms: Array<AtomFragment> }
}

export const CreateAtomsGql = gql`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`
export const DeleteAtomsGql = gql`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetAtomsGql = gql`
  query GetAtoms($where: AtomWhere, $options: AtomOptions) {
    atoms(where: $where, options: $options) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`
export const ImportAtomsGql = gql`
  mutation ImportAtoms($input: ImportAtomsInput!) {
    importAtoms(input: $input) {
      atoms {
        id
      }
    }
  }
`
export const UpdateAtomsGql = gql`
  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
    updateAtoms(update: $update, where: $where) {
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateAtoms: build.mutation<
      CreateAtomsMutation,
      GraphqlOperationOptions<CreateAtomsMutationVariables>
    >({
      query: (options) => ({
        document: CreateAtomsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteAtoms: build.mutation<
      DeleteAtomsMutation,
      GraphqlOperationOptions<DeleteAtomsMutationVariables>
    >({
      query: (options) => ({
        document: DeleteAtomsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetAtoms: build.query<
      GetAtomsQuery,
      GraphqlOperationOptions<GetAtomsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetAtomsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    ImportAtoms: build.mutation<
      ImportAtomsMutation,
      GraphqlOperationOptions<ImportAtomsMutationVariables>
    >({
      query: (options) => ({
        document: ImportAtomsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdateAtoms: build.mutation<
      UpdateAtomsMutation,
      GraphqlOperationOptions<UpdateAtomsMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: UpdateAtomsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateAtomsMutation,
  useDeleteAtomsMutation,
  useGetAtomsQuery,
  useLazyGetAtomsQuery,
  useImportAtomsMutation,
  useUpdateAtomsMutation,
} = injectedRtkApi
