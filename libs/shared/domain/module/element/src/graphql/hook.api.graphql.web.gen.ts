import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { CreateHooksDocument, DeleteHooksDocument } from '@codelab/shared-infra-gqlgen'

export const CreateHooks = (variables: Types.CreateHooksMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateHooksDocument.toString(), variables, next)
export const DeleteHooks = (variables: Types.DeleteHooksMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteHooksDocument.toString(), variables, next)
