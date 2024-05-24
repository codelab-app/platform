import type { IRootDomainStore } from '@codelab/frontend/abstract/domain'
import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  storeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { userDto } from '@codelab/frontend/test/data'
import { AtomDomainService } from '@codelab/frontend-domain-atom'
import { ElementDomainService } from '@codelab/frontend-domain-element'
import { PageDomainService } from '@codelab/frontend-domain-page'
import { RedirectDomainService } from '@codelab/frontend-domain-redirect/services'
import { createRootDomainStore } from '@codelab/frontend-domain-shared'
import { StoreDomainService } from '@codelab/frontend-domain-store'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend-domain-type'
import { UserDomainService } from '@codelab/frontend-domain-user'
import { AppDomainService } from '../services/app.domain.service'

export const rootDomainStore = createRootDomainStore({
  context: {
    appDomainServiceContext,
    atomDomainServiceContext,
    elementDomainServiceContext,
    pageDomainServiceContext,
    redirectDomainServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    appDomainService: new AppDomainService({}),
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
    redirectDomainService: new RedirectDomainService({}),
    storeDomainService: new StoreDomainService({}),
    typeDomainService: new TypeDomainService({}),
    userDomainService: UserDomainService.fromDto(userDto),
  },
}) as IRootDomainStore
