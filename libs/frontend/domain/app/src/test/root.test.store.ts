import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  storeDomainServiceContext,
  typeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { userDto } from '@codelab/frontend/test/data'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { RedirectDomainService } from '@codelab/frontend-domain-redirect/services'
import { createRootDomainStore } from '@codelab/frontend-domain-shared'
import { StoreDomainService } from '@codelab/frontend-domain-store/services'
import { TypeDomainService } from '@codelab/frontend-domain-type/services'
import { UserDomainService } from '@codelab/frontend-domain-user/services'
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
})
