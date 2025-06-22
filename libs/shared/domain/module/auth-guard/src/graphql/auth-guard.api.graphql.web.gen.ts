import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetAuthGuardsDocument, CreateAuthGuardsDocument, UpdateAuthGuardDocument, DeleteAuthGuardsDocument } from '@codelab/shared-infra-gqlgen'

export const GetAuthGuards = (variables: Types.GetAuthGuardsQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetAuthGuardsDocument.toString(), variables, next)
export const CreateAuthGuards = (variables: Types.CreateAuthGuardsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateAuthGuardsDocument.toString(), variables, next)
export const UpdateAuthGuard = (variables: Types.UpdateAuthGuardMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdateAuthGuardDocument.toString(), variables, next)
export const DeleteAuthGuards = (variables: Types.DeleteAuthGuardsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteAuthGuardsDocument.toString(), variables, next)
