import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import {
  clientStubFromCloudEndpoint,
  DgraphClient,
  DgraphClientStub,
  Operation,
} from 'dgraph-js'
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
    private _dgraphConfig: ConfigType<() => DgraphConfig>,
  ) {
    if (!_dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    let clientStub: DgraphClientStub

    if (_dgraphConfig.apiKey) {
      clientStub = clientStubFromCloudEndpoint(
        _dgraphConfig.endpoint,
        _dgraphConfig.apiKey,
      )
    } else {
      clientStub = new DgraphClientStub(_dgraphConfig?.grpcEndpoint)
    }

    // https://discuss.dgraph.io/t/connection-management/11060 - it's safe to use a single client across the app
    this.dgraphClient = new DgraphClient(clientStub)
  }

  updateDqlSchema() {
    const op = new Operation()

    op.setSchema(dgraphSchema)

    return this.client.alter(op)
  }

  async resetDb() {
    const op = new Operation()

    op.setDropOp(Operation.DropOp.DATA) // <- deletes just the data

    await this.client.alter(op)

    await this.updateDqlSchema()
  }
}
