import { AtomType } from '@codelab/backend/abstract/codegen'
import { OgmService } from '@codelab/backend/infra/adapter/neo4j'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import {
  AppProperties,
  connectNodeId,
  connectOwner,
  ElementProperties,
  PageProperties,
} from '@codelab/shared/domain'
import type { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { PageResolverPages } from './page.spec.graphql.gen'
import { setupTestingContext } from './setup'

describe('ComponentResolvers', () => {
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

  it('should fetch a page with field resolvers - name, slug, elements', async () => {
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

    const testApp = (
      await ogmService.App.create({
        input: [
          {
            compositeKey: AppProperties.appCompositeKey('My App', owner),
            id: v4(),
            owner: connectOwner(owner),
          },
        ],
      })
    ).apps[0]!

    const testPageRef = { id: v4() }

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
              ROOT_ELEMENT_NAME,
              testPageRef,
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
              testPageRef,
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

    const testPage = (
      await ogmService.Page.create({
        input: [
          {
            app: connectNodeId(testApp.id),
            compositeKey: PageProperties.pageCompositeKey(
              IPageKindName.Provider,
              testApp,
            ),
            id: v4(),
            kind: IPageKind.Provider,
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
            urlPattern: IPageKindName.Provider,
          },
        ],
      })
    ).pages[0]!

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(PageResolverPages),
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
