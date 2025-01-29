import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetAppBuilderDocument } from './app-builder.api.graphql.docs.gen'


export const GetAppBuilder = (variables: Types.GetAppBuilderQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetAppBuilderDocument.toString(), variables, next)