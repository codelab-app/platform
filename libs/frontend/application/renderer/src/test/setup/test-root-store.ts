import type {
  IActionService,
  IAppService,
  IAtomService,
  IComponentApplicationService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRendererApplicationService,
  IRootStore,
  IStoreService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  componentServiceContext,
  elementServiceContext,
  rendererApplicationServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import { AppService } from '@codelab/frontend/application/app'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import { ElementService } from '@codelab/frontend/application/element'
import {
  PageApplicationService,
  pageServiceContext,
} from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/application/store'
import {
  FieldService,
  fieldServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
import { storeDomainServiceContext } from '@codelab/frontend/domain/store'
import { userDto } from '@codelab/frontend/test/data'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { RendererApplicationService } from '../../renderer.application.service'

export type ITestRootStore = Pick<
  IRootStore,
  | 'actionService'
  | 'appService'
  | 'atomService'
  | 'clear'
  | 'componentService'
  | 'elementService'
  | 'fieldService'
  | 'pageService'
  | 'propService'
  | 'rendererService'
  | 'storeService'
  | 'typeService'
  | 'userService'
>

let testRootStore: ITestRootStore | undefined

export const createTestRootStore = () => {
  @model('@codelab/TestRootStore')
  class TestRootStore
    extends Model({
      actionService: prop<IActionService>(() => new ActionService({})),
      appService: prop<IAppService>(() => new AppService({})),
      atomService: prop<IAtomService>(() => new AtomService({})),
      componentService: prop<IComponentApplicationService>(
        () => new ComponentApplicationService({}),
      ),
      elementService: prop<IElementService>(() => new ElementService({})),
      fieldService: prop<IFieldService>(() => new FieldService({})),
      pageService: prop<IPageApplicationService>(
        () => new PageApplicationService({}),
      ),
      propService: prop<IPropService>(() => new PropService({})),
      rendererService: prop<IRendererApplicationService>(
        () => new RendererApplicationService({}),
      ),
      storeService: prop<IStoreService>(() => new StoreService({})),
      typeService: prop<ITypeService>(() => new TypeService({})),
      userService: prop<IUserService>(() => UserService.fromDto(userDto)),
    })
    implements ITestRootStore
  {
    public clear() {
      this.appService.appDomainService.apps.clear()
      this.typeService.typeDomainService.types.clear()
      this.atomService.atomDomainService.atoms.clear()
      this.componentService.components.clear()
      this.elementService.elementDomainService.elements.clear()
      this.fieldService.fields.clear()
      this.actionService.actions.clear()
      this.storeService.storeDomainService.stores.clear()
      this.userService.users.clear()
      this.rendererService.renderers.clear()
    }

    protected override onInit() {
      appServiceContext.set(this, this.appService)
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      elementServiceContext.set(this, this.elementService)
      storeDomainServiceContext.set(this, this.storeService.storeDomainService)
      fieldServiceContext.set(this, this.fieldService)
      actionServiceContext.set(this, this.actionService)
      propServiceContext.set(this, this.propService)
      pageServiceContext.set(this, this.pageService)
      storeServiceContext.set(this, this.storeService)
      rendererApplicationServiceContext.set(this, this.rendererService)
      userServiceContext.set(this, this.userService)

      registerRootStore(this)
    }
  }

  return (testRootStore ??= new TestRootStore({}))
}
