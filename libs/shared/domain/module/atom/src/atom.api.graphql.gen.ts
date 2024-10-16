import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { AtomFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateAtomsMutationVariables,
  type DeleteAtomsMutationVariables,
  type AtomListQueryVariables,
  type GetSelectAtomOptionsQueryVariables,
  type UpdateAtomsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateAtomsDocument,
  DeleteAtomsDocument,
  AtomListDocument,
  GetSelectAtomOptionsDocument,
  UpdateAtomsDocument,
} from './atom.api.documents.graphql.gen'

export const CreateAtoms = (
  variables: CreateAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateAtomsDocument.toString(), variables, next)

export const DeleteAtoms = (
  variables: DeleteAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteAtomsDocument.toString(), variables, next)

export const AtomList = (
  variables: AtomListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(AtomListDocument.toString(), variables, next)

export const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetSelectAtomOptionsDocument.toString(), variables, next)

export const UpdateAtoms = (
  variables: UpdateAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateAtomsDocument.toString(), variables, next)
