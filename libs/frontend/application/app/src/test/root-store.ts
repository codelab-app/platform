import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { AppDomainService } from '@codelab/frontend/domain/app'
import { PageDomainService } from '@codelab/frontend/domain/page'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export const createTestRootStore = (user: IUserDTO) => {
  @model('@codelab/TestRootStore')
  class TestRootStore extends Model({
    appDomainService: prop(() => new AppDomainService({})),
    atomService: prop(() => new AtomService({})),
    pageDomainService: prop(() => new PageDomainService({})),
    typeDomainService: prop(() => new TypeDomainService({})),
  }) {
    protected override onInit() {
      atomServiceContext.set(this, this.atomService)
      typeDomainServiceContext.set(this, this.typeDomainService)

      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  return rootStore
}
