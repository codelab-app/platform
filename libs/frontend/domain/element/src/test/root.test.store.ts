import type { IRootDomainStore } from '@codelab/frontend/abstract/domain'
import { AtomDomainService } from '@codelab/frontend-domain-atom'
import { PageDomainService } from '@codelab/frontend-domain-page'
import { createRootDomainStore } from '@codelab/frontend-domain-shared'
import { ElementDomainService } from '../services'

export const rootDomainStore = createRootDomainStore({
  context: {},
  store: {
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
  },
}) as IRootDomainStore
