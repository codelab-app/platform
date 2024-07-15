'use server'

import {
  execute,
  type GetDomainsQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { GetDomainsDocument } from './get-domains.document'

export const getDomainsRepository = async ({
  options,
  where,
}: GetDomainsQueryVariables) =>
  await execute(GetDomainsDocument, { options, where })
