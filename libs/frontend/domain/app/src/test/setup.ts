import type {
  IFactoryDomainCallback,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  pageDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import {
  AtomDomainService,
  AtomTestFactory,
} from '@codelab/frontend/domain/atom'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import { PageDomainService } from '@codelab/frontend/domain/page'
import {
  createRootDomainStore,
  DtoDomainFactory,
} from '@codelab/frontend/domain/shared'
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
import { AppDomainService } from '../app.domain.service'

export const rootDomainStore = createRootDomainStore({
  context: {
    appDomainServiceContext,
    atomDomainServiceContext,
    elementDomainServiceContext,
    pageDomainServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    appDomainService: new AppDomainService({}),
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
    storeDomainService: new StoreDomainService({}),
    typeDomainService: new TypeDomainService({}),
    userDomainService: UserDomainService.fromDto(userDto),
  },
}) as IRootDomainStore
