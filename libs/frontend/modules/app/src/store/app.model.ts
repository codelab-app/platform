import { ElementTreeService } from '@codelab/frontend/modules/element'
import { pageRef } from '@codelab/frontend/modules/page'
import { IApp, IAppDTO, IPage } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import {
  detach,
  ExtendedModel,
  idProp,
  model,
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
    store: { id: app.store.id },
    pages: app.pages.map((page) => pageRef(page.id)),
  })
}

@model('@codelab/App')
export class App
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    ownerId: prop<string>(),
    name: prop<string>(),
    rootElement: prop<IEntity>(),
    store: prop<IEntity>(),
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
