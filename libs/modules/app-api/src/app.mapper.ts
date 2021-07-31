import { DgraphApp, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { App } from './app.model'

@Injectable()
export class AppMapper implements Mapper<DgraphApp, App> {
  async map({ ownerId, name, uid }: DgraphApp): Promise<App> {
    return new App(uid, ownerId, name)
  }
}
