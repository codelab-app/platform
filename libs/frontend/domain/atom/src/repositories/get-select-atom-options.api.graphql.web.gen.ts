import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetSelectAtomOptionsDocument } from '@codelab/shared/infra/gqlgen'

export const GetSelectAtomOptions = (variables: Types.GetSelectAtomOptionsQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)
