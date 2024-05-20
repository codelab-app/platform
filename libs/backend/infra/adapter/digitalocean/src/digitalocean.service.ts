// import { getEnv } from '@codelab/shared/config'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { createApiClient } from 'dots-wrapper'
import { digitaloceanConfig } from './digitalocean.config'

@Injectable()
export class DigitaloceanService {
  readonly apiUrl = 'https://api.digitalocean.com/v2'

  client: ReturnType<typeof createApiClient>

  constructor(
    @Inject(digitaloceanConfig.KEY)
    config: ConfigType<typeof digitaloceanConfig>,
  ) {
    this.client = createApiClient({ token: config.apiToken })
  }

  async createDomain(name: string) {
    const input = {
      name,
    }

    const {
      data: { domain },
    } = await this.client.domain.createDomain(input)

    return domain
  }

  async deleteDomain(name: string) {
    const input = {
      name,
    }

    return await this.client.domain.deleteDomain(input)
  }

  async getDomainRecords(domainName: string) {
    const input = {
      domain_name: domainName,
      // per_page: 100,
    }

    const {
      data: { domain_records },
    } = await this.client.domain.listDomainRecords(input)

    return domain_records
  }

  async getSitesDroplet() {
    const input = {
      per_page: 100,
    }

    const {
      data: { droplets },
    } = await this.client.droplet.listDroplets(input)

    return droplets.find((droplet) => droplet.name === 'sites')
  }

  /**
   * Only way to update
   */
  async updateDomain(oldName: string, newName: string) {
    await this.deleteDomain(oldName)

    return this.createDomain(newName)
  }
}
