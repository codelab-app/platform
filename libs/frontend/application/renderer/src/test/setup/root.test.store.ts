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
  rendererServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import type { IRootDomainStore } from '@codelab/frontend/abstract/domain'
import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  pageDomainServiceContext,
  rendererDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { UserService } from '@codelab/frontend/application/user'
import { AppDomainService } from '@codelab/frontend/domain/app'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { createRootDomainStore } from '@codelab/frontend/domain/shared'
import {
  StoreDomainService,
  storeDomainServiceContext,
} from '@codelab/frontend/domain/store'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { UserDomainService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'

export const rootDomainStore = createRootDomainStore({
  context: {
    appDomainServiceContext,
    atomDomainServiceContext,
    elementDomainServiceContext,
    pageDomainServiceContext,
    rendererDomainServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    appDomainService: new AppDomainService({}),
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
    // rendererDomainService: new RendererDomainService({}),
    storeDomainService: new StoreDomainService({}),
    typeDomainService: new TypeDomainService({}),
    userDomainService: UserDomainService.fromDto(userDto),
  },
}) as IRootDomainStore
