import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { PropFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreatePropsMutationVariables,
  type UpdatePropsMutationVariables,
  type DeletePropsMutationVariables,
  type GetPropsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from './prop.api.documents.graphql.gen'

export const CreateProps = (
  variables: CreatePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreatePropsDocument.toString(), variables, next)

export const UpdateProps = (
  variables: UpdatePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdatePropsDocument.toString(), variables, next)

export const DeleteProps = (
  variables: DeletePropsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePropsDocument.toString(), variables, next)

export const GetProps = (
  variables: GetPropsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetPropsDocument.toString(), variables, next)
