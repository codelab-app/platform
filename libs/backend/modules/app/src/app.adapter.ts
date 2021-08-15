import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphApp } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { App } from './app.model'

@Injectable()
export class AppAdapter extends BaseAdapter<DgraphApp, App> {
  mapItem({ ownerId, name, uid }: DgraphApp): App {
    return new App(uid, ownerId, name)
  }
}
