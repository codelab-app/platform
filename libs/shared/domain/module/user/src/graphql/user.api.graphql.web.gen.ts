import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetUsersDocument, CreateUserDocument, DeleteUsersDocument, UpdateUsersDocument } from './user.api.graphql.docs.gen'


export const GetUsers = (variables: Types.GetUsersQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetUsersDocument.toString(), variables, next)
export const CreateUser = (variables: Types.CreateUserMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateUserDocument.toString(), variables, next)
export const DeleteUsers = (variables: Types.DeleteUsersMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteUsersDocument.toString(), variables, next)
export const UpdateUsers = (variables: Types.UpdateUsersMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateUsersDocument.toString(), variables, next)