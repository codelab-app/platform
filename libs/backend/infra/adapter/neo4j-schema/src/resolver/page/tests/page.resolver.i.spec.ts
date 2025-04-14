import type { INestApplication } from '@nestjs/common'

import { AppRepository } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { StoreRepository } from '@codelab/backend/domain/store'
import {
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import {
  IConfigPaneTab,
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { AtomType, BreakpointType } from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'
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
  let elementRepository: ElementRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let enumTypeRepository: EnumTypeRepository
  let unionTypeRepository: UnionTypeRepository
  let arrayTypeRepository: ArrayTypeRepository
  let fieldRepository: FieldRepository
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
    elementRepository = module.get(ElementRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)
    enumTypeRepository = module.get(EnumTypeRepository)
    unionTypeRepository = module.get(UnionTypeRepository)
    arrayTypeRepository = module.get(ArrayTypeRepository)
    fieldRepository = module.get(FieldRepository)
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
      name: 'someusername',
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

    const testApp = await appRepository.add({
      id: v4(),
      name: 'My Name',
      owner: { id: owner.id },
    })

    Validator.assertsDefined(testApp)

    const testPageRef = { id: v4() }

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
      id: v4(),
      name: ROOT_ELEMENT_NAME,
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
        testPageRef,
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
