import type { INestApplication } from '@nestjs/common'

import { AppRepository } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { PropRepository } from '@codelab/backend/domain/prop'
import { StoreRepository } from '@codelab/backend/domain/store'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import {
  IAtomType,
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { Validator } from '@codelab/shared/infra/schema'
import { ElementProperties } from '@codelab/shared-domain-module/element'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'

import { setupTestingContext } from '../../../test/setup'
import { PageResolverPagesDocument } from './page.spec.graphql.gen'

describe('PageResolvers', () => {
  let app: INestApplication
  let userRepository: UserRepository
  let atomRepository: AtomRepository
  let propRepository: PropRepository
  let elementRepository: ElementRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let storeRepository: StoreRepository
  let pageRepository: PageRepository
  let appRepository: AppRepository
  const context = setupTestingContext()

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    app = ctx.nestApp
    userRepository = module.get(UserRepository)
    atomRepository = module.get(AtomRepository)
    propRepository = module.get(PropRepository)
    elementRepository = module.get(ElementRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)
    storeRepository = module.get(StoreRepository)
    pageRepository = module.get(PageRepository)
    appRepository = module.get(AppRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should fetch a page with field resolvers - name, slug, elements', async () => {
    const owner = await userRepository.add({
      auth0Id: 'something',
      email: 'something@some.thing',
      id: v4(),
      roles: [],
      username: 'someusername',
    })

    Validator.assertsDefined(owner)

    const testApp = await appRepository.add({
      id: v4(),
      name: 'My Name',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(testApp)

    const testPageRef = { id: v4() }

    const atomApi = await interfaceTypeRepository.add({
      __typename: 'InterfaceType',
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: 'React Fragment Api',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(atomApi)

    const atomReactFragment = await atomRepository.add({
      __typename: 'Atom',
      api: { id: atomApi.id },
      id: v4(),
      name: 'React Fragment',
      owner: { id: owner.id },
      type: IAtomType.ReactFragment,
    })

    Validator.assertsDefined(atomReactFragment)

    const rootElement = await elementRepository.add({
      closestContainerNode: { id: v4() },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: { data: '{}', id: v4() },
      renderType: {
        __typename: 'Atom',
        id: atomReactFragment.id,
      },
    })

    Validator.assertsDefined(rootElement)

    const childElement = await elementRepository.add({
      closestContainerNode: { id: v4() },
      compositeKey: ElementProperties.elementCompositeKey(
        'Child Element',
        testPageRef,
      ),
      id: v4(),
      name: 'Child Element',
      parentElement: { id: rootElement.id },
      props: { data: '{}', id: v4() },
      renderType: {
        __typename: 'Atom',
        id: atomReactFragment.id,
      },
    })

    Validator.assertsDefined(childElement)

    const storeApi = await interfaceTypeRepository.add({
      __typename: 'InterfaceType',
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: 'Store Api',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(storeApi)

    const store = await storeRepository.add({
      api: { id: storeApi.id },
      id: v4(),
      name: 'some store',
    })

    Validator.assertsDefined(store)

    const testPage = await pageRepository.add({
      app: { id: testApp.id },
      id: v4(),
      kind: IPageKind.Provider,
      name: IPageKindName.Provider,
      rootElement: { id: rootElement.id },
      store: { id: store.id },
      urlPattern: IPageKindName.Provider,
    })

    Validator.assertsDefined(testPage)

    await request(app.getHttpServer())
      .post('/api/v1/graphql')
      .send({
        query: print(PageResolverPagesDocument),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.pages).toEqual([
          {
            elements: [
              {
                id: rootElement.id,
              },
              {
                id: childElement.id,
              },
            ],
            id: testPage.id,
            name: IPageKindName.Provider,
            rootElement: {
              id: rootElement.id,
            },
            slug: IPageKindName.Provider,
          },
        ])
      })
  })
})
