import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetComponentBuilderDocument } from '@codelab/shared-infra-gqlgen'

export const GetComponentBuilder = (variables: Types.GetComponentBuilderQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetComponentBuilderDocument.toString(), variables, next)
