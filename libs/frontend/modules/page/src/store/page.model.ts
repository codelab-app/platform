import { IPage, IPageDTO } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { idProp, Model, model, prop } from 'mobx-keystone'

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: page.name,
    rootElement: { id: page.rootElement.id },
    app: { id: page.app.id },
    providerElement: { id: page.app.rootProviderElement.id },
  })
}

@model('@codelab/Page')
export class Page
  extends Model({
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>(),
    rootElement: prop<IEntity>(),
    providerElement: prop<IEntity>(),
  })
  implements IPage
{
  static hydrate = hydrate
}
