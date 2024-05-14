import type { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import type { IResolvers } from '@graphql-tools/utils'
import { domainConfig } from './field/domain-config'

export const domainResolver: (
  digitaloceanService: DigitaloceanService,
) => IResolvers = (digitaloceanService: DigitaloceanService) => ({
  Domain: {
    domainConfig: domainConfig(digitaloceanService),
  },
})
