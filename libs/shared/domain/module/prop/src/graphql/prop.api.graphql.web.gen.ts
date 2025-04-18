import * as Types from '@codelab/shared-infra-gqlgen'

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from '@codelab/shared-infra-gqlgen'

export const CreateProps = (
  variables: Types.CreatePropsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(CreatePropsDocument.toString(), variables, next)
export const UpdateProps = (
  variables: Types.UpdatePropsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(UpdatePropsDocument.toString(), variables, next)
export const DeleteProps = (
  variables: Types.DeletePropsMutationVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(DeletePropsDocument.toString(), variables, next)
export const GetProps = (
  variables: Types.GetPropsQueryVariables,
  next?: NextFetchOptions,
) => gqlServerRequest(GetPropsDocument.toString(), variables, next)
