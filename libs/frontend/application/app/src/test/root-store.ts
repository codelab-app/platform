import {
  elementServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { ElementService } from '@codelab/frontend/application/element'
import {
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/application/store'
import { UserService } from '@codelab/frontend/application/user'
import { AppDomainService } from '@codelab/frontend/domain/app'
import {
  StoreDomainService,
  storeDomainServiceContext,
} from '@codelab/frontend/domain/store'
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
    elementService: prop(() => new ElementService({})),
    storeDomainService: prop(() => new StoreDomainService({})),
    typeDomainService: prop(() => new TypeDomainService({})),
    userService: prop(() => UserService.fromDto(user)),
  }) {
    protected override onInit() {
      atomServiceContext.set(this, this.atomService)
      userServiceContext.set(this, this.userService)
      typeDomainServiceContext.set(this, this.typeDomainService)
      storeDomainServiceContext.set(this, this.storeDomainService)
      elementServiceContext.set(this, this.elementService)

      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  return rootStore
}
