import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

import {
  type CreateElementsMutationVariables,
  type DeleteElementsMutationVariables,
  type UpdateElementsMutationVariables,
  type ElementListQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateElementsDocument,
  DeleteElementsDocument,
  UpdateElementsDocument,
  ElementListDocument,
} from './element.api.graphql.docs.gen'

export const CreateElements = (
  variables: CreateElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateElementsDocument.toString(), variables, next)

export const DeleteElements = (
  variables: DeleteElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteElementsDocument.toString(), variables, next)

export const UpdateElements = (
  variables: UpdateElementsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateElementsDocument.toString(), variables, next)

export const ElementList = (
  variables: ElementListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(ElementListDocument.toString(), variables, next)
