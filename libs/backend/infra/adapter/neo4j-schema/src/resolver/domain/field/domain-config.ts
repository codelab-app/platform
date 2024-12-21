import type { Domain } from '@codelab/shared/infra/gql'
import type { IFieldResolver } from '@graphql-tools/utils'

import { lookupARecord } from '@codelab/backend/infra/adapter/dns'

export const domainConfig: IFieldResolver<Domain, unknown, unknown> = async ({
  name,
}) => {
  try {
    const records = await lookupARecord(name)
    const exists = records.some((record) => record === '157.230.192.129')

    return { misconfigured: !exists }
  } catch (error) {
    console.error('Domain config error:', error)

    // For testing only
    return { misconfigured: true }
  }
}
