import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { createRootDomainStore } from '@codelab/frontend-domain-shared'

import { ElementDomainService } from '../services'

export const rootDomainStore = createRootDomainStore({
  context: {},
  store: {
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
  },
})
