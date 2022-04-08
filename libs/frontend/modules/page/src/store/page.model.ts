import { Nullish } from '@codelab/shared/abstract/types'
import { idProp, Model, model, prop } from 'mobx-keystone'
import { PageFragment } from '../graphql/page.fragment.graphql.gen'

@model('codelab/Page')
export class Page extends Model({
  id: idProp,
  appId: prop<Nullish<string>>(),
  name: prop<string>(),
  rootElementId: prop<string>(),
  providerElementId: prop<string>(),
}) {
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static fromFragment(page: PageFragment) {
    return new Page({
      id: page.id,
      name: page.name,
      rootElementId: page.rootElement.id,
      appId: page.app.id,
      providerElementId: page.app.rootProviderElement.id,
    })
  }
}
