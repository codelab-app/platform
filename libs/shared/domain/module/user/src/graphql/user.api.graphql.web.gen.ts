import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetUsersDocument, CreateUserDocument, DeleteUsersDocument, UpdateUsersDocument } from '@codelab/shared-infra-gqlgen'

export const GetUsers = (variables: Types.GetUsersQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetUsersDocument.toString(), variables, next)
export const CreateUser = (variables: Types.CreateUserMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateUserDocument.toString(), variables, next)
export const DeleteUsers = (variables: Types.DeleteUsersMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteUsersDocument.toString(), variables, next)
export const UpdateUsers = (variables: Types.UpdateUsersMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdateUsersDocument.toString(), variables, next)
