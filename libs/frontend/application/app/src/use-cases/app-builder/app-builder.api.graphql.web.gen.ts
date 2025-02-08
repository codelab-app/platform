import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetAppBuilderDocument } from '@codelab/shared/infra/gqlgen'

export const GetAppBuilder = (variables: Types.GetAppBuilderQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(GetAppBuilderDocument.toString(), variables, next)
