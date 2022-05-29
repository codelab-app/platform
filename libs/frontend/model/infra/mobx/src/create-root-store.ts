import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService, appServiceContext } from '@codelab/frontend/modules/app'
import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import { BuilderService } from '@codelab/frontend/modules/builder'
import { ComponentService } from '@codelab/frontend/modules/component'
import { ElementService } from '@codelab/frontend/modules/element'
import { PageService, pageServiceContext } from '@codelab/frontend/modules/page'
import { RenderService } from '@codelab/frontend/modules/renderer'
import {
  ResourceService,
  resourceServiceContext,
} from '@codelab/frontend/modules/resource'
import {
  ActionService,
  actionServiceContext,
  StoreService,
} from '@codelab/frontend/modules/store'
import { TagService } from '@codelab/frontend/modules/tag'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import { UserService, userServiceContext } from '@codelab/frontend/modules/user'
import {
  componentServiceContext,
  elementServiceContext,
  storeServiceContext,
} from '@codelab/frontend/presenter/container'
import { IRootStore, RootStoreData } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = (
  { user }: RootStoreData,
  props?: Partial<IRootStore>,
) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      userService: prop(() => UserService.init(user)),
      appService: prop(() => new AppService({})),
      pageService: prop(() => new PageService({})),
      typeService: prop(() => new TypeService({})),
      atomService: prop(() => new AtomService({})),
      tagService: prop(() => new TagService({})),
      adminService: prop(() => new AdminService({})),
      componentService: prop(() => new ComponentService({})),
      appRenderService: prop(() => new RenderService({})),
      builderRenderService: prop(() => new RenderService({})),
      actionService: prop(() => new ActionService({})),
      storeService: prop(() => new StoreService({})),
      resourceService: prop(() => new ResourceService({})),
      elementService: prop(() => new ElementService({})),
      builderService: prop(() => new BuilderService({})),
    })
    implements IRootStore
  {
    protected onInit(): void {
      appServiceContext.set(this, this.appService)
      pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      actionServiceContext.set(this, this.actionService)
      storeServiceContext.set(this, this.storeService)
      resourceServiceContext.set(this, this.resourceService)
      elementServiceContext.set(this, this.elementService)
      userServiceContext.set(this, this.userService)
    }
  }

  return new RootStore(props ?? ({} as any)) as IRootStore
}
