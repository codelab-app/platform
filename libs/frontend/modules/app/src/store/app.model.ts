import { IApp, IAppDTO } from '@codelab/shared/abstract/core'
import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('@codelab/App')
export class App
  extends Model({
    id: idProp,
    ownerId: prop<string>(),
    name: prop<string>(),
    rootProviderElement: prop<Nullable<IEntity>>(null),
    store: prop<Nullable<IEntity>>(null),
  })
  implements IApp
{
  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static hydrate(app: IAppDTO) {
    return new App({
      id: app.id,
      name: app.name,
      ownerId: app.owner?.id,
      rootProviderElement: { id: app.rootProviderElement.id },
      store: app.store?.id ? { id: app.store?.id as string } : undefined,
    })
  }
}

export const appRef = rootRef<App>('@codelab/AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
