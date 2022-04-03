import { EntityLike, Nullish } from '@codelab/shared/abstract/types'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { AppFragment } from '../graphql/App.fragment.v2.1.graphql.gen'

@model('codelab/App')
export class App extends Model({
  id: idProp,
  ownerId: prop<Nullish<string>>(),
  name: prop<string>(),
  rootProviderElement: prop<Nullish<EntityLike>>(),
  store: prop<Nullish<EntityLike>>(),
}) {
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static fromFragment(app: AppFragment) {
    return new App({
      id: app.id,
      name: app.name,
      ownerId: app.owner?.[0]?.id,
      rootProviderElement: { id: app.rootProviderElement.id },
      store: app.store?.id ? { id: app.store?.id as string } : undefined,
    })
  }
}

export const appRef = rootRef<App>('AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
