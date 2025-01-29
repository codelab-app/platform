import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'


export const GetSelectAtomOptions = (variables: Types.GetSelectAtomOptionsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)