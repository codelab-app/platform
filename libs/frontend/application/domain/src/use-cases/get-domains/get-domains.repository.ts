'use server'

import { type GetDomainsQueryVariables } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { GetDomainsDocument } from './get-domains.document'

export const getDomainsRepository = async ({
  options,
  where,
}: GetDomainsQueryVariables) =>
  await gqlFetch(GetDomainsDocument, { options, where })
