import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { DgraphConfiguration } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'

//dgraph-js gave me this issue for some reason https://discuss.dgraph.io/t/error-13-internal-received-rst-stream-with-code-2-internal-server-error/11957/3
//using dgraph-js-http for now
@Injectable()
export class DGraphService {
  private _client: DgraphClient

  private _config: DgraphConfiguration

  private _stub: DgraphClientStub

  get client(): DgraphClient {
    return this._client
  }

  constructor(configService: ConfigService) {
    const config = configService.get<DgraphConfiguration>(
      DgraphTokens.DgraphConfig.toString(),
    )

    if (!config) {
      throw new Error('No dgraph config found')
    }

    this._config = config

    this._stub = new DgraphClientStub(this._config.endpoint)
    this._client = new DgraphClient(this._stub)
  }

  close() {
    if (this._stub) {
      // this._stub.close() //close rpc client
      this._stub = null!
    }

    this._client = null!
  }
}
