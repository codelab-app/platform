import * as Types from '@codelab/frontend/abstract/codegen'

import { AtomBaseFragment, AtomFragment } from './Atom.fragment.graphql.gen'
import { Export__AtomsFragment } from './AtomExport.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from './Atom.fragment.graphql.gen'
import { Export__AtomsFragmentDoc } from './AtomExport.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput
}>

export type CreateAtomMutation = { createAtom: AtomBaseFragment }

export type DeleteAtomMutationVariables = Types.Exact<{
  input: Types.DeleteAtomInput
}>

export type DeleteAtomMutation = {
  deleteAtom?: AtomBaseFragment | null | undefined
}

export type ExportAtomsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetAtomsInput>
}>

export type ExportAtomsQuery = {
  getAtoms?: Array<Export__AtomsFragment> | null | undefined
}

export type GetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput
}>

export type GetAtomQuery = { getAtom?: AtomFragment | null | undefined }

export type GetAtomsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetAtomsInput>
}>

export type GetAtomsQuery = {
  getAtoms?: Array<AtomFragment> | null | undefined
}

export type ImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput
}>

export type ImportAtomsMutation = { importAtoms?: void | null | undefined }

export type UpdateAtomMutationVariables = Types.Exact<{
  input: Types.UpdateAtomInput
}>

export type UpdateAtomMutation = {
  updateAtom?: AtomBaseFragment | null | undefined
}

export const CreateAtomGql = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export const DeleteAtomGql = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export const ExportAtomsGql = gql`
  query ExportAtoms($input: GetAtomsInput) {
    getAtoms(input: $input) {
      ...Export__Atoms
    }
  }
  ${Export__AtomsFragmentDoc}
`
export const GetAtomGql = gql`
  query GetAtom($input: GetAtomInput!) {
    getAtom(input: $input) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`
export const GetAtomsGql = gql`
  query GetAtoms($input: GetAtomsInput) {
    getAtoms(input: $input) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`
export const ImportAtomsGql = gql`
  mutation ImportAtoms($input: ImportAtomsInput!) {
    importAtoms(input: $input)
  }
`
export const UpdateAtomGql = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    updateAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateAtom: build.mutation<
      CreateAtomMutation,
      GraphqlOperationOptions<CreateAtomMutationVariables>
    >({
      query: (options) => ({
        document: CreateAtomGql,
        options: options ?? undefined,
      }),
    }),
    DeleteAtom: build.mutation<
      DeleteAtomMutation,
      GraphqlOperationOptions<DeleteAtomMutationVariables>
    >({
      query: (options) => ({
        document: DeleteAtomGql,
        options: options ?? undefined,
      }),
    }),
    ExportAtoms: build.query<
      ExportAtomsQuery,
      GraphqlOperationOptions<ExportAtomsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: ExportAtomsGql,
        options: options ?? undefined,
      }),
    }),
    GetAtom: build.query<
      GetAtomQuery,
      GraphqlOperationOptions<GetAtomQueryVariables>
    >({
      query: (options) => ({
        document: GetAtomGql,
        options: options ?? undefined,
      }),
    }),
    GetAtoms: build.query<
      GetAtomsQuery,
      GraphqlOperationOptions<GetAtomsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetAtomsGql,
        options: options ?? undefined,
      }),
    }),
    ImportAtoms: build.mutation<
      ImportAtomsMutation,
      GraphqlOperationOptions<ImportAtomsMutationVariables>
    >({
      query: (options) => ({
        document: ImportAtomsGql,
        options: options ?? undefined,
      }),
    }),
    UpdateAtom: build.mutation<
      UpdateAtomMutation,
      GraphqlOperationOptions<UpdateAtomMutationVariables>
    >({
      query: (options) => ({
        document: UpdateAtomGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
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
} = injectedRtkApi
