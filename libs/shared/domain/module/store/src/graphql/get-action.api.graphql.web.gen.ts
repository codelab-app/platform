import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetActionsDocument } from './get-action.api.graphql.docs.gen'


export const GetActions = (variables: Types.GetActionsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetActionsDocument.toString(), variables, next)