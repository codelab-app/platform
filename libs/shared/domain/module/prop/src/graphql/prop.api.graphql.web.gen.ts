import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreatePropsDocument, UpdatePropsDocument, DeletePropsDocument, GetPropsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateProps = (variables: Types.CreatePropsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreatePropsDocument.toString(), variables, next)
export const UpdateProps = (variables: Types.UpdatePropsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdatePropsDocument.toString(), variables, next)
export const DeleteProps = (variables: Types.DeletePropsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeletePropsDocument.toString(), variables, next)
export const GetProps = (variables: Types.GetPropsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetPropsDocument.toString(), variables, next)
