import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { IsTypeDescendantOfDocument, GetTypeReferencesDocument } from '@codelab/shared/infra/gqlgen'

export const IsTypeDescendantOf = (variables: Types.IsTypeDescendantOfQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(IsTypeDescendantOfDocument.toString(), variables, next)
export const GetTypeReferences = (variables: Types.GetTypeReferencesQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetTypeReferencesDocument.toString(), variables, next)