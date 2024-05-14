import type { Domain } from '@codelab/backend/abstract/codegen'
import type { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import type { IFieldResolver } from '@graphql-tools/utils'

export const domainConfig: (
  digitaloceanService: DigitaloceanService,
) => IFieldResolver<Domain, unknown, unknown> =
  (digitaloceanService: DigitaloceanService) =>
  async ({ name }) => {
    try {
      const records = await digitaloceanService.getDomainRecords(name)
      const droplet = await digitaloceanService.getSitesDroplet()

      if (!droplet) {
        throw new Error('Droplet not found')
      }

      const { networks, status } = droplet

      if (status !== 'active') {
        return { misconfigured: true }
      }

      const aRecord = records.find(
        (record: { type: string }) => record.type === 'A',
      )

      const dropletAddress = networks.v4.find(
        (network: { type: string }) => network.type === 'public',
      )

      return { misconfigured: aRecord?.data !== dropletAddress?.ip_address }
    } catch (error) {
      console.error('Domain config error:', error)

      return { misconfigured: true }
    }
  }
