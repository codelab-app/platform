import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { PropFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreatePropsMutationVariables,
  type UpdatePropsMutationVariables,
  type DeletePropsMutationVariables,
  type GetPropsQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from './prop.api.graphql.docs.gen'

export const CreateProps = (
  variables: CreatePropsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreatePropsDocument.toString(), variables, next)

export const UpdateProps = (
  variables: UpdatePropsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdatePropsDocument.toString(), variables, next)

export const DeleteProps = (
  variables: DeletePropsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeletePropsDocument.toString(), variables, next)

export const GetProps = (
  variables: GetPropsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetPropsDocument.toString(), variables, next)
