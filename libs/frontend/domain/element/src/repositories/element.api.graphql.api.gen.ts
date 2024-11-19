import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '@codelab/shared/infra/gql'

import {
  type CreateElementsMutationVariables,
  type DeleteElementsMutationVariables,
  type UpdateElementsMutationVariables,
  type ElementListQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateElementsDocument,
  DeleteElementsDocument,
  UpdateElementsDocument,
  ElementListDocument,
} from './element.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateElements: (variables: CreateElementsMutationVariables) =>
    gqlRequest(CreateElementsDocument.toString(), variables),
  DeleteElements: (variables: DeleteElementsMutationVariables) =>
    gqlRequest(DeleteElementsDocument.toString(), variables),
  UpdateElements: (variables: UpdateElementsMutationVariables) =>
    gqlRequest(UpdateElementsDocument.toString(), variables),
  ElementList: (variables: ElementListQueryVariables) =>
    gqlRequest(ElementListDocument.toString(), variables),
})
