import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetPageProductionDocument } from '@codelab/shared-infra-gqlgen'

export const GetPageProduction = (variables: Types.GetPageProductionQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPageProductionDocument.toString(), variables, next)
