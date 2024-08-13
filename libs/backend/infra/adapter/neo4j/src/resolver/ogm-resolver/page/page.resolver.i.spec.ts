import { AtomType } from '@codelab/backend/abstract/codegen'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import {
  AppProperties,
  connectNodeId,
  connectOwner,
  ElementProperties,
  PageProperties,
  refValidation,
} from '@codelab/shared/domain'
import type { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { OgmService } from '../../../infra'
import { setupTestingContext } from '../../../test/setup'
import { PageResolverPagesDocument } from './page.spec.graphql.gen'

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
    ).users[0]

    refValidation.asserts(owner)

    const testApp = (
      await ogmService.App.create({
        input: [
          {
            compositeKey: AppProperties.appCompositeKey(
              { slug: 'my-app' },
              owner,
            ),
            id: v4(),
            owner: connectOwner(owner),
          },
        ],
      })
    ).apps[0]

    refValidation.asserts(testApp)

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
    ).interfaceTypes[0]

    refValidation.asserts(atomApi)

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
    ).atoms[0]

    refValidation.asserts(atomReactFragment)

    const props = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]

    refValidation.asserts(props)

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
    ).elements[0]

    refValidation.asserts(rootElement)

    const childElementProps = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]

    refValidation.asserts(childElementProps)

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
    ).elements[0]

    refValidation.asserts(childElement)

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
    ).interfaceTypes[0]

    refValidation.asserts(storeApi)

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
    ).stores[0]

    refValidation.asserts(store)

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
    ).pages[0]

    refValidation.asserts(testPage)

    await request(app.getHttpServer())
      .post('/graphql')
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
