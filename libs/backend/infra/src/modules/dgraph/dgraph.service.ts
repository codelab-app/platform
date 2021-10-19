import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { DgraphConfig, dgraphConfig } from './config/dgraph.config'
import { dgraphSchema } from './dgraph.schema'

/**
 * Handles connection and schema management of dgraph
 */
@Injectable()
export class DgraphService {
  private readonly dgraphClient: DgraphClient

  public get client() {
    return this.dgraphClient
  }

  constructor(
    @Inject(dgraphConfig.KEY)
    _dgraphConfig: ConfigType<() => DgraphConfig>,
  ) {
    if (!_dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    // console.log('Dgraph endpoint using', _dgraphConfig.endpoint)

    const clientStub = new DgraphClientStub(_dgraphConfig.endpoint)

    // https://discuss.dgraph.io/t/connection-management/11060 - it's safe to use a single client across the app
    this.dgraphClient = new DgraphClient(clientStub)

    if (_dgraphConfig.apiKey) {
      this.dgraphClient.setCloudApiKey(_dgraphConfig.apiKey)
    }
  }

  async updateDqlSchema() {
    return await this.client.alter({
      dropAll: true,
      schema: dgraphSchema,
    })
  }

  async resetData() {
    await this.client.alter({
      dropAll: true,
      schema: '{"drop_op": "DATA"}',
    })
  }
}
