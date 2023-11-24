import { AtomType } from '@codelab/backend/abstract/codegen'
import {
  connectNodeId,
  connectOwner,
  ElementProperties,
} from '@codelab/shared/domain/mapper'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { GraphQLSchemaModule } from '../../graphql-schema.module'
import { Neo4jModule, Neo4jService, OgmModule, OgmService } from '../../infra'
import { GRAPHQL_SCHEMA_PROVIDER } from '../../schema'

describe('PageResolvers', () => {
  let app: INestApplication
  let neo4jService: Neo4jService
  let ogmService: OgmService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          imports: [GraphQLSchemaModule],
          inject: [GRAPHQL_SCHEMA_PROVIDER],
          useFactory: async (graphqlSchema: GraphQLSchema) => {
            return {
              schema: graphqlSchema,
            }
          },
        }),
        Neo4jModule,
        OgmModule,
      ],
    }).compile()

    neo4jService = module.get(Neo4jService)
    ogmService = module.get(OgmService)
    app = module.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    const driver = neo4jService.driver
    const session = driver.session()

    await session
      .executeWrite((txn) =>
        txn.run(`
        MATCH (n)
        DETACH DELETE n
      `),
      )
      .catch((error) => {
        console.error(error)
        throw error
      })
      .finally(async () => {
        await session.close()
      })
  })

  it('should fetch a component with elements resolver', async () => {
    const owner = (
      await ogmService.User.create({
        input: [
          {
            auth0Id: 'something',
            email: 'something@some.thing',
            id: v4(),
            username: 'someusername',
          },
        ],
      })
    ).users[0]!

    const componentRef = { id: v4() }

    const atomApi = (
      await ogmService.InterfaceType.create({
        input: [
          {
            id: v4(),
            name: 'React Fragment Api',
            owner: connectOwner(owner),
          },
        ],
      })
    ).interfaceTypes[0]!

    const atomReactFragment = (
      await ogmService.Atom.create({
        input: [
          {
            api: connectNodeId(atomApi.id),
            id: v4(),
            name: 'React Fragment',
            owner: connectOwner(owner),
            type: AtomType.ReactFragment,
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

    const rootElement = (
      await ogmService.Element.create({
        input: [
          {
            compositeKey: ElementProperties.elementCompositeKey(
              'Component Root',
              componentRef,
            ),
            id: v4(),
            props: connectNodeId(props.id),
            renderType: {
              Atom: connectNodeId(atomReactFragment.id),
            },
          },
        ],
      })
    ).elements[0]!

    const childElementProps = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]!

    const childElement = (
      await ogmService.Element.create({
        input: [
          {
            compositeKey: ElementProperties.elementCompositeKey(
              'Child Element',
              componentRef,
            ),
            id: v4(),
            parentElement: connectNodeId(rootElement.id),
            props: connectNodeId(childElementProps.id),
            renderType: {
              Atom: connectNodeId(atomReactFragment.id),
            },
          },
        ],
      })
    ).elements[0]!

    const storeApi = (
      await ogmService.InterfaceType.create({
        input: [
          {
            id: v4(),
            name: 'Store Api',
            owner: connectOwner(owner),
          },
        ],
      })
    ).interfaceTypes[0]!

    const store = (
      await ogmService.Store.create({
        input: [
          {
            api: connectNodeId(storeApi.id),
            id: v4(),
            name: 'some store',
          },
        ],
      })
    ).stores[0]!

    const componentApi = (
      await ogmService.InterfaceType.create({
        input: [
          {
            id: v4(),
            name: 'Component Api',
            owner: connectOwner(owner),
          },
        ],
      })
    ).interfaceTypes[0]!

    const componentProps = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]!

    const component = (
      await ogmService.Component.create({
        input: [
          {
            api: connectNodeId(componentApi.id),
            childrenContainerElement: connectNodeId(rootElement.id),
            id: v4(),
            name: 'Component',
            owner: connectOwner(owner),
            props: connectNodeId(componentProps.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
          },
        ],
      })
    ).components[0]!

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          {
            components {
              id
              name
              rootElement {
                id
                descendantElements {
                  id
                }
              }
              elements {
                id
              }
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
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
            name: component.name,
            rootElement: {
              descendantElements: [
                {
                  id: childElement.id,
                },
              ],
              id: rootElement.id,
            },
          },
        ])
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
