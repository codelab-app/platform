import {
  type IActionDomainService,
  type IAppDomainService,
  type IAtomDomainService,
  type IAuthGuardDomainService,
  type IComponentDomainService,
  type IDomainDomainService,
  type IDomainStore,
  type IElementDomainService,
  type IFieldDomainService,
  type IPageDomainService,
  type IRedirectDomainService,
  type IResourceDomainService,
  type IStoreDomainService,
  type ITagDomainService,
  type ITypeDomainService,
  type IUserDomainService,
} from '@codelab/frontend/abstract/domain'
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
import { StoreDomainService } from '@codelab/frontend-domain-store/services'
import { TagDomainService } from '@codelab/frontend-domain-tag/services'
import {
  FieldDomainService,
  TypeDomainService,
} from '@codelab/frontend-domain-type/services'
import { UserDomainService } from '@codelab/frontend-domain-user/services'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

export const createDomainStore = (user: IUserDto) => {
  @model('@codelab/DomainStore')
  class DomainStore
    extends Model({
      actionDomainService: prop<IActionDomainService>(
        () => new ActionDomainService({}),
      ),
      appDomainService: prop<IAppDomainService>(() => new AppDomainService({})),
      atomDomainService: prop<IAtomDomainService>(
        () => new AtomDomainService({}),
      ),
      authGuardDomainService: prop<IAuthGuardDomainService>(
        () => new AuthGuardDomainService({}),
      ),
      componentDomainService: prop<IComponentDomainService>(
        () => new ComponentDomainService({}),
      ),
      domainDomainService: prop<IDomainDomainService>(
        () => new DomainDomainService({}),
      ),
      elementDomainService: prop<IElementDomainService>(
        () => new ElementDomainService({}),
      ),
      fieldDomainService: prop<IFieldDomainService>(
        () => new FieldDomainService({}),
      ),
      pageDomainService: prop<IPageDomainService>(
        () => new PageDomainService({}),
      ),
      redirectDomainService: prop<IRedirectDomainService>(
        () => new RedirectDomainService({}),
      ),
      resourceDomainService: prop<IResourceDomainService>(
        () => new ResourceDomainService({}),
      ),
      storeDomainService: prop<IStoreDomainService>(
        () => new StoreDomainService({}),
      ),
      tagDomainService: prop<ITagDomainService>(() => new TagDomainService({})),
      typeDomainService: prop<ITypeDomainService>(
        () => new TypeDomainService({}),
      ),
      userDomainService: prop<IUserDomainService>(() =>
        UserDomainService.fromDto(user),
      ),
    })
    implements IDomainStore {}

  return new DomainStore({})
}
