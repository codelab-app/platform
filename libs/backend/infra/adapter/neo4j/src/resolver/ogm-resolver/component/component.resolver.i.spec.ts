import type { INestApplication } from '@nestjs/common'

import { AtomType } from '@codelab/backend/abstract/codegen'
import {
  ComponentProperties,
  connectNodeId,
  connectOwner,
  ElementProperties,
} from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'
import { print } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'

import { OgmService } from '../../../infra'
import { setupTestingContext } from '../../../test/setup'
import { ComponentResolverComponentsDocument } from './component.spec.graphql.gen'

describe('PageResolvers', () => {
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
    ).users[0]

    const componentRef = { id: v4() }

    Validator.assertsDefined(owner)

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

    Validator.assertsDefined(atomApi)

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

    Validator.assertsDefined(atomReactFragment)

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

    Validator.assertsDefined(props)

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
    ).elements[0]

    Validator.assertsDefined(rootElement)

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

    Validator.assertsDefined(childElementProps)

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
    ).elements[0]

    Validator.assertsDefined(childElement)

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

    Validator.assertsDefined(storeApi)

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

    Validator.assertsDefined(store)

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
    ).interfaceTypes[0]

    Validator.assertsDefined(componentApi)

    const componentProps = (
      await ogmService.Prop.create({
        input: [
          {
            data: '{}',
            id: v4(),
          },
        ],
      })
    ).props[0]

    Validator.assertsDefined(componentProps)

    const component = (
      await ogmService.Component.create({
        input: [
          {
            api: connectNodeId(componentApi.id),
            compositeKey: ComponentProperties.componentCompositeKey(
              {
                slug: 'cui-card',
              },
              { id: v4() },
            ),
            id: v4(),
            owner: connectOwner(owner),
            props: connectNodeId(componentProps.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
          },
        ],
      })
    ).components[0]

    Validator.assertsDefined(component)

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(ComponentResolverComponentsDocument),
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
