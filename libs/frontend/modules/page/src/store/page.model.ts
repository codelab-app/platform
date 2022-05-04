import { IPage, IPageDTO } from '@codelab/shared/abstract/core'
import { idProp, Model, model, prop } from 'mobx-keystone'

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: page.name,
    rootElementId: page.rootElement.id,
    appId: page.app.id,
    providerElementId: page.app.rootProviderElement.id,
  })
}

@model('@codelab/Page')
export class Page
  extends Model({
    id: idProp,
    appId: prop<string>(),
    name: prop<string>(),
    rootElementId: prop<string>(),
    providerElementId: prop<string>(),
  })
  implements IPage
{
  static hydrate = hydrate
}
