import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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

export const getSdk = () => ({
  CreateAtoms: (variables: CreateAtomsMutationVariables) =>
    gqlRequest(CreateAtomsDocument.toString(), variables),
  DeleteAtoms: (variables: DeleteAtomsMutationVariables) =>
    gqlRequest(DeleteAtomsDocument.toString(), variables),
  AtomList: (variables: AtomListQueryVariables) =>
    gqlRequest(AtomListDocument.toString(), variables),
  GetSelectAtomOptions: (variables: GetSelectAtomOptionsQueryVariables) =>
    gqlRequest(GetSelectAtomOptionsDocument.toString(), variables),
  UpdateAtoms: (variables: UpdateAtomsMutationVariables) =>
    gqlRequest(UpdateAtomsDocument.toString(), variables),
})
