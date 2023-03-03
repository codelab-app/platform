import type {
  IActionService,
  IAppService,
  IElementService,
  IPageService,
  IStoreService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { elementServiceContext } from '@codelab/frontend/abstract/core'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/domain/store'
import { TypeService, typeServiceContext } from '@codelab/frontend/domain/type'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { AppService, appServiceContext } from '../store'

@model('@codelab/TestRootStore')
export class TestRootStore extends Model({
  actionService: prop<IActionService>(() => new ActionService({})),
  appService: prop<IAppService>(() => new AppService({})),
  elementService: prop<IElementService>(() => new ElementService({})),
  pageService: prop<IPageService>(() => new PageService({})),
  storeService: prop<IStoreService>(() => new StoreService({})),
  typeService: prop<ITypeService>(() => new TypeService({})),
}) {
  protected override onInit() {
    appServiceContext.set(this, this.appService)
    elementServiceContext.set(this, this.elementService)
    storeServiceContext.set(this, this.storeService)
    pageServiceContext.set(this, this.pageService)
    typeServiceContext.set(this, this.typeService)
    actionServiceContext.set(this, this.actionService)

    registerRootStore(this)
  }
}
