import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
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
    appService: prop(() => new AppDomainService({})),
    atomService: prop(() => new AtomService({})),
    pageService: prop(() => new PageDomainService({})),
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
