import type { Domain } from '@codelab/backend/abstract/codegen'
import {
  getDomainRecords,
  getWebsitesDroplet,
} from '@codelab/backend/domain/production-domain'
import type { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: IFieldResolver<Domain, unknown, unknown> = async ({
  name,
}) => {
  try {
    const records = await getDomainRecords(name)
    const { networks, status } = await getWebsitesDroplet()

    if (status !== 'active') {
      return { misconfigured: true }
    }

    const aRecord = records.find(
      (record: { type: string }) => record.type === 'A',
    )

    const dropletAddress = networks.v4.find(
      (network: { type: string }) => network.type === 'public',
    )

    return { misconfigured: aRecord.data !== dropletAddress.ip_address }
  } catch (error) {
    console.error('Domain config error:', error)

    return { misconfigured: true }
  }
}
