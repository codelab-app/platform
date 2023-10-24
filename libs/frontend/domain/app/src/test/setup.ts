import type {
  IFactoryDomainCallback,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import {
  appDomainServiceContext,
  atomDomainServiceContext,
  elementDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import {
  AtomDomainService,
  AtomTestFactory,
} from '@codelab/frontend/domain/atom'
import { ElementDomainService } from '@codelab/frontend/domain/element'
import {
  createRootDomainStore,
  DtoDomainFactory,
} from '@codelab/frontend/domain/shared'
import {
  StoreDomainService,
  storeDomainServiceContext,
} from '@codelab/frontend/domain/store'
import {
  TypeDomainService,
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { UserDomainService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { AppDomainService } from '../app.domain.service'
import { AppModelFactory, AppTestFactory } from './app.test.factory'

type RootDomainStore = Pick<IRootDomainStore, 'appDomainService'>

export const rootDomainStore = createRootDomainStore({
  context: {
    appDomainServiceContext,
    atomDomainServiceContext,
    elementDomainServiceContext,
    storeDomainServiceContext,
    typeDomainServiceContext,
    userDomainServiceContext,
  },
  store: {
    appDomainService: new AppDomainService({}),
    atomDomainService: new AtomDomainService({}),
    elementDomainService: new ElementDomainService({}),
    storeDomainService: new StoreDomainService({}),
    typeDomainService: new TypeDomainService({}),
    userDomainService: UserDomainService.fromDto(userDto),
  },
}) as RootDomainStore

const factories: IFactoryDomainCallback = (rootStore) => ({
  app: AppTestFactory(rootStore),
  atom: AtomTestFactory(rootStore),
})

export const factory = new DtoDomainFactory(factories, rootDomainStore)

export const appModelFactory = new AppModelFactory(rootDomainStore)
