import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphApp } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { App } from '../domain/app.model'

@Injectable()
export class AppAdapter extends BaseAdapter<DgraphApp, App> {
  mapItem({ ownerId, name, uid }: DgraphApp) {
    return new App({ id: uid, ownerId, name })
  }
}
