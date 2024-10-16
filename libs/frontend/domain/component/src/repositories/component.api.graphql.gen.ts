import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { ComponentFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateComponentsMutationVariables,
  type DeleteComponentsMutationVariables,
  type UpdateComponentsMutationVariables,
  type ComponentListQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateComponentsDocument,
  DeleteComponentsDocument,
  UpdateComponentsDocument,
  ComponentListDocument,
} from './component.api.documents.graphql.gen'

export const CreateComponents = (
  variables: CreateComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateComponentsDocument.toString(), variables, next)

export const DeleteComponents = (
  variables: DeleteComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteComponentsDocument.toString(), variables, next)

export const UpdateComponents = (
  variables: UpdateComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateComponentsDocument.toString(), variables, next)

export const ComponentList = (
  variables: ComponentListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(ComponentListDocument.toString(), variables, next)
