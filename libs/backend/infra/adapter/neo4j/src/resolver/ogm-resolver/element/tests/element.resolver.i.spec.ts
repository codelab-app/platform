import { AtomType } from '@codelab/backend/abstract/codegen'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
} from '@codelab/shared/domain'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { GraphQLSchemaModule } from '../../../../graphql-schema.module'
import { DatabaseService, OgmService } from '../../../../infra'
import { GRAPHQL_SCHEMA_PROVIDER } from '../../../../schema'
import { setupTestingContext } from '../../../../test/setup'

describe('ElementResolvers', () => {
  let app: INestApplication
  let ogmService: OgmService
  const context = setupTestingContext()

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    app = ctx.nestApp
    ogmService = module.get(OgmService)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should fetch Element.dependantTypes', async () => {
    const owner = (
      await ogmService.User.create({
        input: [
          {
            auth0Id: v4(),
            email: 'test@codelab.com',
            id: v4(),
            username: 'test',
          },
        ],
      })
    ).users[0]!

    const enumTypes = (
      await ogmService.EnumType.create({
        input: [
          {
            id: v4(),
            name: 'EnumType1',
            owner: connectOwner(owner),
          },
          {
            id: v4(),
            name: 'EnumType2',
            owner: connectOwner(owner),
          },
        ],
      })
    ).enumTypes

    const unionType = (
      await ogmService.UnionType.create({
        input: [
          {
            id: v4(),
            name: 'UnionType1',
            owner: connectOwner(owner),
            typesOfUnionType: {
              EnumType: connectNodeIds(enumTypes.map((type) => type.id)),
            },
          },
        ],
      })
    ).unionTypes[0]!

    const arrayType = (
      await ogmService.ArrayType.create({
        input: [
          {
            id: v4(),
            itemType: connectNodeId(unionType.id),
            name: 'ArrayType1',
            owner: connectOwner(owner),
          },
        ],
      })
    ).arrayTypes[0]!

    const atomApi = (
      await ogmService.InterfaceType.create({
        input: [
          {
            id: v4(),
            name: 'AtomApi',
            owner: connectOwner(owner),
          },
        ],
      })
    ).interfaceTypes[0]!

    await ogmService.Field.create({
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

    const atom = (
      await ogmService.Atom.create({
        input: [
          {
            api: connectNodeId(atomApi.id),
            id: v4(),
            name: 'Atom',
            owner: connectOwner(owner),
            type: AtomType.HtmlSpan,
          },
        ],
      })
    ).atoms[0]!

    const props = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]!

    await ogmService.Element.create({
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
        query: `
          {
            elements {
              dependantTypes {
                ... on EnumType {
                  id
                  name
                }
                ... on ArrayType {
                  id
                  name
                }
                ... on UnionType {
                  id
                  name
                }
              }
            }
          }
        `,
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
                id: enumTypes[0]!.id,
                name: enumTypes[0]!.name,
              },
              {
                id: enumTypes[1]!.id,
                name: enumTypes[1]!.name,
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
