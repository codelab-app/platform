import type { IAppDTO, IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IAppModel } from './app.model.interface'

export interface IAppDomainService {
  apps: ObjectMap<IAppModel>
  appsJson: IPropData
  appsList: Array<IAppModel>

  add(appDto: IAppDTO): IAppModel
  app(id: string): Maybe<IAppModel>
}
