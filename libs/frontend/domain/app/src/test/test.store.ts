import type { IDomainStore } from '@codelab/frontend-abstract-domain'

import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  storeDomainServiceContext,
  typeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend-abstract-domain'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { RedirectDomainService } from '@codelab/frontend-domain-redirect/services'
import { domainStoreFactory } from '@codelab/frontend-domain-shared'
import { StoreDomainService } from '@codelab/frontend-domain-store/services'
import { TypeDomainService } from '@codelab/frontend-domain-type/services'
import { UserDomainService } from '@codelab/frontend-domain-user/services'
import { userDto } from '@codelab/frontend-test-data'

import { AppDomainService } from '../services/app.domain.service'

type ITestDomainStore = Pick<
  IDomainStore,
  | 'appDomainService'
  | 'atomDomainService'
  | 'elementDomainService'
  | 'pageDomainService'
  | 'redirectDomainService'
  | 'storeDomainService'
  | 'typeDomainService'
  | 'userDomainService'
>

export const createTestDomainStore = () => {
  const store = domainStoreFactory({
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
      userDomainService: new UserDomainService({}),
    },
  }) as ITestDomainStore

  return store
}
