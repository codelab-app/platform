import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { createRootDomainStore } from '@codelab/frontend-domain-shared'

export const rootDomainStore = createRootDomainStore({
  context: {},
  store: {
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
  },
})
