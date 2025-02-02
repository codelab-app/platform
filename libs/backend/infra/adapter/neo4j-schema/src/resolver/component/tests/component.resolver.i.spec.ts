import type { INestApplication } from '@nestjs/common'

import { AtomRepository } from '@codelab/backend/domain/atom'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { StoreRepository } from '@codelab/backend/domain/store'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { AtomType } from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'
import { cLog } from '@codelab/shared/utils'
import { ElementProperties } from '@codelab/shared-domain-module/element'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'

import { setupTestingContext } from '../../../test/setup'
import { ComponentResolverComponentsDocument } from './component.spec.graphql.gen'

describe('ComponentResolvers', () => {
  let app: INestApplication
  let userRepository: UserRepository
  let atomRepository: AtomRepository
  let propRepository: PropRepository
  let elementRepository: ElementRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let storeRepository: StoreRepository
  let componentRepository: ComponentRepository
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
    componentRepository = module.get(ComponentRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should fetch a component with elements resolver', async () => {
    const owner = await userRepository.add({
      auth0Id: 'something',
      email: 'something@some.thing',
      id: v4(),
      roles: [],
      username: 'someusername',
    })

    const componentRef = { id: v4() }

    Validator.assertsDefined(owner)

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
      type: AtomType.ReactFragment,
    })

    Validator.assertsDefined(atomReactFragment)

    // const props = await propRepository.add({
    //   data: '{}',
    //   id: v4(),
    // })

    const rootElement = await elementRepository.add({
      closestContainerNode: { id: v4() },
      compositeKey: ElementProperties.elementCompositeKey(
        { name: 'Component Root' },
        componentRef,
      ),
      id: v4(),
      name: 'Component Root',
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
        { name: 'Child Element' },
        componentRef,
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

    const componentApi = await interfaceTypeRepository.add({
      __typename: 'InterfaceType',
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: 'Component Api',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(componentApi)

    const component = await componentRepository.add({
      __typename: 'Component',
      api: { id: componentApi.id },
      id: v4(),
      name: 'Cui Card',
      owner: { id: owner.id },
      props: { data: '{}', id: v4() },
      rootElement: { id: rootElement.id },
      store: { id: store.id },
    })

    Validator.assertsDefined(component)

    await request(app.getHttpServer())
      .post('/api/v1/graphql')
      .send({
        query: print(ComponentResolverComponentsDocument),
      })
      .expect(200)
      .expect((res) => {
        cLog('res', res.body.data)

        expect(res.body.data.components).toEqual([
          {
            elements: [
              {
                id: rootElement.id,
              },
              {
                id: childElement.id,
              },
            ],
            id: component.id,
            name: 'Cui Card',
            rootElement: {
              id: rootElement.id,
            },
            slug: 'cui-card',
          },
        ])
      })
  })
})
