import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetSelectAtomOptionsDocument } from '@codelab/shared/infra/gqlgen'

export const GetSelectAtomOptions = (variables: Types.GetSelectAtomOptionsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)