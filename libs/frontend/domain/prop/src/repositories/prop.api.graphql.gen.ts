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
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreatePropsDocument.toString(), variables, next)

export const UpdateProps = (
  variables: UpdatePropsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdatePropsDocument.toString(), variables, next)

export const DeleteProps = (
  variables: DeletePropsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeletePropsDocument.toString(), variables, next)

export const GetProps = (
  variables: GetPropsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetPropsDocument.toString(), variables, next)
