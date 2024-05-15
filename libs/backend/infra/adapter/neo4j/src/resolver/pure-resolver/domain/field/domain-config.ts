import type { Domain } from '@codelab/backend/abstract/codegen'
import type { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import { lookupARecord } from '@codelab/backend/infra/adapter/dns'
import type { IFieldResolver } from '@graphql-tools/utils'

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
    return { misconfigured: false }
  }
}
