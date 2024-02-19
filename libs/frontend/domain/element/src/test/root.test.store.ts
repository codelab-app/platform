import type { IRootDomainStore } from '@codelab/frontend/abstract/domain'
import { AtomDomainService } from '@codelab/frontend/domain/atom'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { createRootDomainStore } from '@codelab/frontend/domain/shared'
import { StoreDomainService } from '@codelab/frontend/domain/store'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { UserDomainService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { ElementDomainService } from '../services'

export const rootDomainStore = createRootDomainStore({
  context: {},
  store: {
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    pageDomainService: new PageDomainService({}),
  },
}) as IRootDomainStore
