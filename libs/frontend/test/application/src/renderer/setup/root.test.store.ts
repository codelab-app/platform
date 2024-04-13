/* eslint-disable @nx/enforce-module-boundaries */
import {
  componentServiceContext,
  elementServiceContext,
  type IRootStore,
  rendererServiceContext,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend/abstract/application'
import type {
  IRootDomainStore,
  IRootDomainStoreDto,
} from '@codelab/frontend/abstract/domain'
import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  pageDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AppService } from '@codelab/frontend/application/app'
import { AtomService } from '@codelab/frontend/application/atom'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import { ElementService } from '@codelab/frontend/application/element'
import { PageApplicationService } from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import {
  RendererApplicationService,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend/application/renderer'
import { ResourceService } from '@codelab/frontend/application/resource'
import {
  createTestRootStore,
  RouterService,
} from '@codelab/frontend/application/shared/store'
import {
  ActionService,
  StoreService,
} from '@codelab/frontend/application/store'
import { FieldService, TypeService } from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
import { AppDomainService } from '@codelab/frontend/domain/app'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { ComponentDomainService } from '@codelab/frontend/domain/component'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { createRootDomainStore } from '@codelab/frontend/domain/shared'
import { StoreDomainService } from '@codelab/frontend/domain/store'
import {
  FieldDomainService,
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { UserDomainService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { v4 } from 'uuid'

export const rootApplicationStore = createTestRootStore({
  context: {
    actionDomainServiceContext,
    appDomainServiceContext,
    atomDomainServiceContext,
    componentDomainServiceContext,
    componentServiceContext,
    elementDomainServiceContext,
    elementServiceContext,
    fieldDomainServiceContext,
    pageDomainServiceContext,
    propServiceContext,
    rendererServiceContext,
    resourceDomainServiceContext,
    routerServiceContext,
    runtimeComponentServiceContext,
    runtimeElementServiceContext,
    runtimePageServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    actionService: new ActionService({}),
    appService: new AppService({}),
    atomService: new AtomService({}),
    componentService: new ComponentApplicationService({}),
    elementService: new ElementService({}),
    fieldService: new FieldService({}),
    pageService: new PageApplicationService({}),
    propService: new PropService({}),
    rendererService: new RendererApplicationService({}),
    resourceService: new ResourceService({}),
    routerService: new RouterService({}),
    runtimeComponentService: new RuntimeComponentService({}),
    runtimeElementService: new RuntimeElementService({}),
    runtimePageService: new RuntimePageService({}),
    storeService: new StoreService({}),
    typeService: new TypeService({}),
    userService: UserService.init({
      email: '',
      email_verified: false,
      family_name: '',
      given_name: '',
      'https://api.codelab.app/jwt/claims': {
        neo4j_user_id: v4(),
        roles: [],
      },
      locale: '',
      name: '',
      nickname: '',
      picture: '',
      sid: '',
      sub: '',
      updated_at: '',
    }),
  },
}) as IRootStore
