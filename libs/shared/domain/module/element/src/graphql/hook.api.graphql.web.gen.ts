import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateHooksDocument, DeleteHooksDocument } from '@codelab/shared/infra/gqlgen'

export const CreateHooks = (variables: Types.CreateHooksMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateHooksDocument.toString(), variables, next)
export const DeleteHooks = (variables: Types.DeleteHooksMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteHooksDocument.toString(), variables, next)
