import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetPageBuilderDocument } from '@codelab/shared-infra-gqlgen'

export const GetPageBuilder = (variables: Types.GetPageBuilderQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPageBuilderDocument.toString(), variables, next)
