import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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
} from './atom.api.graphql.docs.gen'

export const CreateAtoms = (
  variables: CreateAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateAtomsDocument.toString(), variables, next)

export const DeleteAtoms = (
  variables: DeleteAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteAtomsDocument.toString(), variables, next)

export const AtomList = (
  variables: AtomListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(AtomListDocument.toString(), variables, next)

export const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)

export const UpdateAtoms = (
  variables: UpdateAtomsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateAtomsDocument.toString(), variables, next)
