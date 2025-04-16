import type { INestApplication } from '@nestjs/common'

import { AtomRepository } from '@codelab/backend-domain-atom'
import { ComponentRepository } from '@codelab/backend-domain-component'
import { ElementRepository } from '@codelab/backend-domain-element'
import { StoreRepository } from '@codelab/backend-domain-store'
import {
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend-domain-type'
import { UserRepository } from '@codelab/backend-domain-user'
import { IConfigPaneTab, ITypeKind } from '@codelab/shared-abstract-core'
import { ElementProperties } from '@codelab/shared-domain-module-element'
import { AtomType, BreakpointType } from '@codelab/shared-infra-gqlgen'
import { logger } from '@codelab/shared-infra-logging'
import { Validator } from '@codelab/shared-infra-typebox'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'

import { setupTestingContext } from '../../../test/setup'
import { ComponentResolverComponentsDocument } from './component.spec.graphql.gen'

describe('ComponentResolvers', () => {
  let app: INestApplication
  let userRepository: UserRepository
  let atomRepository: AtomRepository
  let enumTypeRepository: EnumTypeRepository
  let unionTypeRepository: UnionTypeRepository
  let arrayTypeRepository: ArrayTypeRepository
  let fieldRepository: FieldRepository
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
    enumTypeRepository = module.get(EnumTypeRepository)
    unionTypeRepository = module.get(UnionTypeRepository)
    arrayTypeRepository = module.get(ArrayTypeRepository)
    fieldRepository = module.get(FieldRepository)
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
      name: 'something',
      picture: '',
      preferences: {
        activeConfigPaneTab: IConfigPaneTab.Node,
        builderBreakpointType: BreakpointType.Desktop,
        builderWidth: 1000,
        id: v4(),
      },
      roles: [],
      username: 'someusername',
    })

    const componentRef = { id: v4() }

    Validator.assertsDefined(owner)

    const enumTypes = await Promise.all([
      enumTypeRepository.add({
        __typename: 'EnumType',
        allowedValues: [],
        id: v4(),
        kind: ITypeKind.EnumType,
        name: 'EnumType1',
        owner: { id: owner.id },
      }),
      enumTypeRepository.add({
        __typename: 'EnumType',
        allowedValues: [],
        id: v4(),
        kind: ITypeKind.EnumType,
        name: 'EnumType2',
        owner: { id: owner.id },
      }),
    ])

    const enumType1 = enumTypes[0]
    const enumType2 = enumTypes[1]

    Validator.assertsDefined(enumType1)
    Validator.assertsDefined(enumType2)

    const unionType = await unionTypeRepository.add({
      __typename: 'UnionType',
      id: v4(),
      kind: ITypeKind.UnionType,
      name: 'UnionType1',
      owner: { id: owner.id },
      typesOfUnionType: enumTypes.map((type) => ({
        __typename: type.__typename,
        id: type.id,
      })),
    })

    Validator.assertsDefined(unionType)

    const arrayType = await arrayTypeRepository.add({
      __typename: 'ArrayType',
      id: v4(),
      itemType: { __typename: unionType.__typename, id: unionType.id },
      kind: ITypeKind.ArrayType,
      name: 'ArrayType1',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(arrayType)

    const atomApi = await interfaceTypeRepository.add({
      __typename: 'InterfaceType',
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: 'AtomApi',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(atomApi)

    await fieldRepository.addMany([
      {
        api: { id: atomApi.id },
        fieldType: { id: unionType.id },
        id: v4(),
        key: 'field1',
        name: 'Field1',
      },
      {
        api: { id: atomApi.id },
        fieldType: { id: arrayType.id },
        id: v4(),
        key: 'field2',
        name: 'Field2',
      },
    ])

    const atom = await atomRepository.add({
      __typename: 'Atom',
      api: { id: atomApi.id },
      id: v4(),
      name: 'Atom',
      owner: { id: owner.id },
      type: AtomType.HtmlSpan,
    })

    Validator.assertsDefined(atom)

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
        id: atom.id,
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
        id: atom.id,
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
        logger.debug('res', res.body.data)

        expect(res.body.data.components).toEqual([
          {
            dependantTypes: expect.arrayContaining([
              {
                __typename: ITypeKind.ArrayType,
                id: arrayType.id,
              },
              {
                __typename: ITypeKind.EnumType,
                id: enumType1.id,
              },
              {
                __typename: ITypeKind.EnumType,
                id: enumType2.id,
              },
              {
                __typename: ITypeKind.UnionType,
                id: unionType.id,
              },
            ]),
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
