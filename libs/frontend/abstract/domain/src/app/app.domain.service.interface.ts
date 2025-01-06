import type { IAppDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { IAppModel } from './app.model.interface'

export interface IAppDomainService extends IHydrateable<IAppDto, IAppModel> {
  apps: ObjectMap<IAppModel>
  appsList: Array<IAppModel>
  app(id: string): Maybe<IAppModel>
}
