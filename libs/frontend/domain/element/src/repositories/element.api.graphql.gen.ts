import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './element.api.documents.graphql.gen'

export const CreateElements = (
  variables: CreateElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateElementsDocument.toString(), variables, next)

export const DeleteElements = (
  variables: DeleteElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteElementsDocument.toString(), variables, next)

export const UpdateElements = (
  variables: UpdateElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateElementsDocument.toString(), variables, next)

export const ElementList = (
  variables: ElementListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(ElementListDocument.toString(), variables, next)
