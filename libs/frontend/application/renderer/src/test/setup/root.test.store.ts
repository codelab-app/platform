import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IRootDomainStore,
  IRootDomainStoreDto,
} from '@codelab/frontend/abstract/domain'
import {
  appDomainServiceContext,
  atomDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  pageDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { createRootApplicationStore } from '@codelab/frontend/application/shared/store'
import { AppDomainService } from '@codelab/frontend/domain/app'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { ComponentDomainService } from '@codelab/frontend/domain/component'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { createRootDomainStore } from '@codelab/frontend/domain/shared'
import {
  StoreDomainService,
  storeDomainServiceContext,
} from '@codelab/frontend/domain/store'
import {
  FieldDomainService,
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { UserDomainService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { RendererApplicationService } from '../../renderer.application.service'

const rootDomainStoreDto: IRootDomainStoreDto = {
  context: {
    appDomainServiceContext,
    atomDomainServiceContext,
    componentDomainServiceContext,
    elementDomainServiceContext,
    fieldDomainServiceContext,
    pageDomainServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    appDomainService: new AppDomainService({}),
    atomDomainService: new AtomDomainService({}),
    componentDomainService: new ComponentDomainService({}),
    elementDomainService: new ElementDomainService({}),
    fieldDomainService: new FieldDomainService({}),
    pageDomainService: new PageDomainService({}),
    storeDomainService: new StoreDomainService({}),
    typeDomainService: new TypeDomainService({}),
    userDomainService: UserDomainService.fromDto(userDto),
  },
}

export const rootDomainStore = createRootDomainStore(
  rootDomainStoreDto,
) as IRootDomainStore

export const rootApplicationStore = createRootApplicationStore({
  context: {},
  store: {
    rendererService: new RendererApplicationService({}),
  },
}) as IRootStore
