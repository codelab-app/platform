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
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateComponentsDocument.toString(), variables, next)

export const DeleteComponents = (
  variables: DeleteComponentsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteComponentsDocument.toString(), variables, next)

export const UpdateComponents = (
  variables: UpdateComponentsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateComponentsDocument.toString(), variables, next)

export const ComponentList = (
  variables: ComponentListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(ComponentListDocument.toString(), variables, next)
