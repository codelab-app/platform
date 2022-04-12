import { IPage, IPageDTO } from '@codelab/shared/abstract/core'
import { idProp, Model, model, prop } from 'mobx-keystone'

@model('codelab/Page')
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
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static fromFragment(page: IPageDTO) {
    return new Page({
      id: page.id,
      name: page.name,
      rootElementId: page.rootElement.id,
      appId: page.app.id,
      providerElementId: page.app.rootProviderElement.id,
    })
  }
}
