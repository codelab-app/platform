import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ComponentFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateComponentsMutationVariables,
  type DeleteComponentsMutationVariables,
  type UpdateComponentsMutationVariables,
  type ComponentListQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateComponentsDocument,
  DeleteComponentsDocument,
  UpdateComponentsDocument,
  ComponentListDocument,
} from './component.api.graphql.docs.gen'

export const CreateComponents = (
  variables: CreateComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateComponentsDocument.toString(), variables, next)

export const DeleteComponents = (
  variables: DeleteComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteComponentsDocument.toString(), variables, next)

export const UpdateComponents = (
  variables: UpdateComponentsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateComponentsDocument.toString(), variables, next)

export const ComponentList = (
  variables: ComponentListQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(ComponentListDocument.toString(), variables, next)
