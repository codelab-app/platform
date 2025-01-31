import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetComponentBuilderDocument } from '@codelab/shared/infra/gqlgen'



export const GetComponentBuilder = (variables: Types.GetComponentBuilderQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetComponentBuilderDocument.toString(), variables, next)