import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.documents.graphql.gen'

export const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetSelectAtomOptionsDocument.toString(), variables, next)
