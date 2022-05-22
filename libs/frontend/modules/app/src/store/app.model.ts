import { ElementTreeService } from '@codelab/frontend/modules/element'
import { pageRef } from '@codelab/frontend/modules/page'
import { IApp, IAppDTO, IPage } from '@codelab/shared/abstract/core'
import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import {
  detach,
  ExtendedModel,
  idProp,
  model,
  modelClass,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

const hydrate = (app: IAppDTO) => {
  return new App({
    id: app.id,
    name: app.name,
    ownerId: app.owner?.id,
    rootElement: { id: app.rootElement.id },
    store: app.store?.id ? { id: app.store?.id as string } : undefined,
    pages: app.pages.map((page) => pageRef(page.id)),
  })
}

@model('@codelab/App')
export class App
  extends ExtendedModel(modelClass(ElementTreeService), {
    id: idProp,
    ownerId: prop<string>(),
    name: prop<string>(),
    rootElement: prop<IEntity>(),
    store: prop<Nullable<IEntity>>(null),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
  static hydrate = hydrate
}

export const appRef = rootRef<App>('@codelab/AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
