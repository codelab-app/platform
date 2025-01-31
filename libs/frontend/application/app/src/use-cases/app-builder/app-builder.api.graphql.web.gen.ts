import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetAppBuilderDocument } from '@codelab/shared/infra/gqlgen'

export const GetAppBuilder = (variables: Types.GetAppBuilderQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetAppBuilderDocument.toString(), variables, next)