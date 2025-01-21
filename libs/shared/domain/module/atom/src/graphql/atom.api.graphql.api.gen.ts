import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { AtomFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateAtomsMutationVariables,
  type DeleteAtomsMutationVariables,
  type AtomListQueryVariables,
  type GetSelectAtomOptionsQueryVariables,
  type UpdateAtomsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateAtomsDocument,
  DeleteAtomsDocument,
  AtomListDocument,
  GetSelectAtomOptionsDocument,
  UpdateAtomsDocument,
} from './atom.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateAtoms: (variables: CreateAtomsMutationVariables) =>
    gqlRequest(client, CreateAtomsDocument.toString(), variables),
  DeleteAtoms: (variables: DeleteAtomsMutationVariables) =>
    gqlRequest(client, DeleteAtomsDocument.toString(), variables),
  AtomList: (variables: AtomListQueryVariables) =>
    gqlRequest(client, AtomListDocument.toString(), variables),
  GetSelectAtomOptions: (variables: GetSelectAtomOptionsQueryVariables) =>
    gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables),
  UpdateAtoms: (variables: UpdateAtomsMutationVariables) =>
    gqlRequest(client, UpdateAtomsDocument.toString(), variables),
})
