import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { GetPagePreviewDocument, GetPageProductionDocument } from '@codelab/shared-infra-gqlgen'

export const GetPagePreview = (variables: Types.GetPagePreviewQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPagePreviewDocument.toString(), variables, next)
export const GetPageProduction = (variables: Types.GetPageProductionQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetPageProductionDocument.toString(), variables, next)
