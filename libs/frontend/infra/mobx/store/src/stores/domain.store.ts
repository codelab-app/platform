import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  authGuardDomainServiceContext,
  componentDomainServiceContext,
  domainDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  tagDomainServiceContext,
  typeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend-abstract-domain'
import { ActionDomainService } from '@codelab/frontend-domain-action/services'
import { AppDomainService } from '@codelab/frontend-domain-app/services'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import { AuthGuardDomainService } from '@codelab/frontend-domain-auth-guard/services'
import { ComponentDomainService } from '@codelab/frontend-domain-component/services'
import { DomainDomainService } from '@codelab/frontend-domain-domain/services'
import { ElementDomainService } from '@codelab/frontend-domain-element/services'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { RedirectDomainService } from '@codelab/frontend-domain-redirect/services'
import { ResourceDomainService } from '@codelab/frontend-domain-resource/services'
import { domainStoreFactory } from '@codelab/frontend-domain-shared'
import { StoreDomainService } from '@codelab/frontend-domain-store/services'
import { TagDomainService } from '@codelab/frontend-domain-tag/services'
import {
  FieldDomainService,
  TypeDomainService,
} from '@codelab/frontend-domain-type/services'
import { UserDomainService } from '@codelab/frontend-domain-user/services'

export const createDomainStore = () => {
  return domainStoreFactory({
    context: {
      actionDomainServiceContext,
      appDomainServiceContext,
      atomDomainServiceContext,
      authGuardDomainServiceContext,
      componentDomainServiceContext,
      domainDomainServiceContext,
      elementDomainServiceContext,
      fieldDomainServiceContext,
      pageDomainServiceContext,
      redirectDomainServiceContext,
      resourceDomainServiceContext,
      storeDomainServiceContext,
      tagDomainServiceContext,
      typeDomainServiceContext,
      userDomainServiceContext,
    },
    store: {
      actionDomainService: new ActionDomainService({}),
      appDomainService: new AppDomainService({}),
      atomDomainService: new AtomDomainService({}),
      authGuardDomainService: new AuthGuardDomainService({}),
      componentDomainService: new ComponentDomainService({}),
      domainDomainService: new DomainDomainService({}),
      elementDomainService: new ElementDomainService({}),
      fieldDomainService: new FieldDomainService({}),
      pageDomainService: new PageDomainService({}),
      redirectDomainService: new RedirectDomainService({}),
      resourceDomainService: new ResourceDomainService({}),
      storeDomainService: new StoreDomainService({}),
      tagDomainService: new TagDomainService({}),
      typeDomainService: new TypeDomainService({}),
      userDomainService: new UserDomainService({}),
    },
  })
}
