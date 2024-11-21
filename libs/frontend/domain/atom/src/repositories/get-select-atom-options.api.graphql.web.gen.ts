import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'

export const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)
