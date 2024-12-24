import type { INestApplication } from '@nestjs/common'

import { AtomRepository } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import {
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import { UserRepository } from '@codelab/backend/domain/user'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
} from '@codelab/shared/domain/orm'
import { AtomType } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'

import { setupTestingContext } from './../../../test/setup'
import { ElementDependentTypesDocument } from './element.spec.graphql'

describe('ElementResolvers', () => {
  let app: INestApplication
  let userRepository: UserRepository
  let enumTypeRepository: EnumTypeRepository
  let unionTypeRepository: UnionTypeRepository
  let arrayTypeRepository: ArrayTypeRepository
  let interfaceTypeRepository: InterfaceTypeRepository
  let fieldRepository: FieldRepository
  let atomRepository: AtomRepository
  let propRepository: PropRepository
  let elementRepository: ElementRepository
  const context = setupTestingContext()

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    app = ctx.nestApp
    userRepository = module.get(UserRepository)
    enumTypeRepository = module.get(EnumTypeRepository)
    unionTypeRepository = module.get(UnionTypeRepository)
    arrayTypeRepository = module.get(ArrayTypeRepository)
    interfaceTypeRepository = module.get(InterfaceTypeRepository)
    fieldRepository = module.get(FieldRepository)
    atomRepository = module.get(AtomRepository)
    propRepository = module.get(PropRepository)
    elementRepository = module.get(ElementRepository)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should fetch Element.dependantTypes', async () => {
    const owner = await userRepository.add({
      auth0Id: v4(),
      email: 'test@codelab.com',
      id: v4(),
      roles: [],
      username: 'test',
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

    const arrayType = await arrayTypeRepository.create({
      id: v4(),
      itemType: connectNodeId(unionType.id),
      name: 'ArrayType1',
      owner: connectOwner(owner),
    })

    Validator.assertsDefined(arrayType)

    const atomApi = await interfaceTypeRepository.create({
      id: v4(),
      name: 'AtomApi',
      owner: connectOwner(owner),
    })

    Validator.assertsDefined(atomApi)

    await fieldRepository.create({
      input: [
        {
          api: connectNodeId(atomApi.id),
          fieldType: connectNodeId(unionType.id),
          id: v4(),
          key: 'field1',
          name: 'Field1',
        },
        {
          api: connectNodeId(atomApi.id),
          fieldType: connectNodeId(arrayType.id),
          id: v4(),
          key: 'field2',
          name: 'Field2',
        },
      ],
    })

    const atom = await atomRepository.create({
      api: connectNodeId(atomApi.id),
      id: v4(),
      name: 'Atom',
      owner: connectOwner(owner),
      type: AtomType.HtmlSpan,
    })

    Validator.assertsDefined(atom)

    const props = await propRepository.create({
      data: '{}',
      id: v4(),
    })

    Validator.assertsDefined(props)

    await elementRepository.create({
      input: [
        {
          compositeKey: 'test',
          id: v4(),
          props: connectNodeId(props.id),
          renderType: {
            Atom: connectNodeId(atom.id),
          },
        },
      ],
    })

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(ElementDependentTypesDocument),
      })
      .expect(200)
      .expect(async ({ body }) => {
        expect(body.data.elements).toEqual([
          {
            dependantTypes: [
              {
                id: arrayType.id,
                name: arrayType.name,
              },
              {
                id: enumType1.id,
                name: enumType1.name,
              },
              {
                id: enumType2.id,
                name: enumType2.name,
              },
              {
                id: unionType.id,
                name: unionType.name,
              },
            ],
          },
        ])
      })
  })
})
