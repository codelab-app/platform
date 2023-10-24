import type {
  IFactoryApplicationCallback,
  IRootStoreDtoTest,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  componentServiceContext,
  elementServiceContext,
  IRootStore,
  IRootStoreContext,
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
import { DtoFactory } from '@codelab/frontend/application/shared/store'
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
import { AppTestFactory } from '@codelab/frontend/domain/app'
import { AtomTestFactory } from '@codelab/frontend/domain/atom'
import { ComponentTestFactory } from '@codelab/frontend/domain/component'
import { ElementTestFactory } from '@codelab/frontend/domain/element'
import { PageTestFactory } from '@codelab/frontend/domain/page'
import { PropTestFactory } from '@codelab/frontend/domain/prop'
import { RendererTestFactory } from '@codelab/frontend/domain/renderer'
import {
  storeDomainServiceContext,
  StoreTestFactory,
} from '@codelab/frontend/domain/store'
import {
  FieldTestFactory,
  InterfaceTypeTestFactory,
  PrimitiveTypeTestFactory,
  ReactNodeTypeTestFactory,
  RenderPropTypeTestFactory,
} from '@codelab/frontend/domain/type'
import { userDto } from '@codelab/frontend/test/data'
import { RendererApplicationService } from '../../renderer.application.service'
import { createTestRootStore } from './test-root-store'

const factories: IFactoryApplicationCallback = (rootStore) => ({
  app: AppTestFactory(rootStore),
  atom: AtomTestFactory(rootStore),
  component: ComponentTestFactory(rootStore),
  element: ElementTestFactory(rootStore),
  field: FieldTestFactory(rootStore),
  interfaceType: InterfaceTypeTestFactory(rootStore),
  page: PageTestFactory(rootStore),
  primitiveType: PrimitiveTypeTestFactory(rootStore),
  props: PropTestFactory(rootStore),
  reactNodeType: ReactNodeTypeTestFactory(rootStore),
  renderer: RendererTestFactory(rootStore),
  renderPropType: RenderPropTypeTestFactory(rootStore),
  store: StoreTestFactory(rootStore),
})

const store: IRootStoreDtoTest['store'] = {
  actionService: new ActionService({}),
  appService: new AppService({}),
  atomService: new AtomService({}),
  componentService: new ComponentApplicationService({}),
  elementService: new ElementService({}),
  fieldService: new FieldService({}),
  pageService: new PageApplicationService({}),
  propService: new PropService({}),
  rendererService: new RendererApplicationService({}),
  storeService: new StoreService({}),
  typeService: new TypeService({}),
  userService: UserService.fromDto(userDto),
}

const context: IRootStoreDtoTest['context'] = {
  actionServiceContext,
  appServiceContext,
  atomServiceContext,
  componentServiceContext,
  elementServiceContext,
  fieldServiceContext,
  pageServiceContext,
  propServiceContext,
  rendererApplicationServiceContext,
  storeDomainServiceContext,
  storeServiceContext,
  typeServiceContext,
  userServiceContext,
}

// export const testRootStore = createTestRootStore({ context, store })

export const testRootStore = createTestRootStore()

export const dtoFactory = new DtoFactory(factories, testRootStore)
