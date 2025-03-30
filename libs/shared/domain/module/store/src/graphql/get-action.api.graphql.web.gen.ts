import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetActionsDocument } from '@codelab/shared/infra/gqlgen'

export const GetActions = (variables: Types.GetActionsQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetActionsDocument.toString(), variables, next)
