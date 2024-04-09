import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/domain'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import type { IResourceFetchConfig } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPageKind,
} from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { configure } from 'mobx'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'
import { setupRuntimeElement } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Runtime Element props', () => {
  beforeEach(() => {
    rootApplicationStore.clear()
    testbed = new TestBed()
  })

  describe('RuntimeProps.props', () => {
    it('should contain system props', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement.runtimeProps

      expect(runtimeProps.props).toMatchObject({
        [DATA_ELEMENT_ID]: element.id,
        key: element.id,
        ref: expect.any(Function),
      })
    })

    it('should contain element props', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement.runtimeProps

      element.props.set('randomProp', 'RandomPropValue')

      expect(runtimeProps.props).toMatchObject({
        randomProp: 'RandomPropValue',
      })
    })

    it('should contain default props', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement.runtimeProps
      const atom = element.renderType.current
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testbed.addField({
        api: atom.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: testbed.getStringType(),
        key: fieldKey,
      })

      atom.api.current.writeCache({ fields: [field] })

      expect(runtimeProps.props).toMatchObject({
        [fieldKey]: JSON.parse(fieldDefaultValue),
      })
    })
  })

  describe('RuntimeProps.evaluatedProps', () => {
    it.each([
      ['state', IPageKind.Provider],
      ['rootState', IPageKind.Regular],
    ])(
      'should evaluate state field expression with %s in %s',
      (stateKey, pageKind) => {
        // set renderType to builder for state to update when changing field default values
        const { element, page, runtimeElement } = setupRuntimeElement(
          testbed,
          RendererType.PageBuilder,
          pageKind,
        )

        const runtimeProps = runtimeElement.runtimeProps
        const fieldKey = 'fieldKey'
        const fieldDefaultValue = 'some-value'
        const propKey = 'propKey'
        const store = page.providerPage?.store ?? page.store
        const storeApi = store.current.api.current

        const field = testbed.addField({
          api: storeApi,
          defaultValues: JSON.stringify(fieldDefaultValue),
          fieldType: testbed.getStringType(),
          key: fieldKey,
        })

        storeApi.writeCache({ fields: [field] })

        element.props.set(propKey, `{{${stateKey}.${fieldKey}}}`)

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: fieldDefaultValue,
        })

        field.writeCache({ defaultValues: JSON.stringify('another-value') })

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'another-value',
        })
      },
    )

    it.each([
      ['actions', IPageKind.Provider],
      ['rootActions', IPageKind.Regular],
    ])(
      'should evaluate action expression with %s in %s',
      (actionsKey, pageKind) => {
        const isProviderPage = pageKind === IPageKind.Provider

        const { element, page, runtimeElement } = setupRuntimeElement(
          testbed,
          RendererType.Preview,
          pageKind,
        )

        const runtimeProps = runtimeElement.runtimeProps
        const actionName = 'sum'
        const propKey = 'propKey'
        const store = isProviderPage ? element.store : page.providerPage?.store

        testbed.addCodeAction({
          code: `function run(a,b){
          return a + b;
        }`,
          name: actionName,
          store,
        })

        element.props.set(propKey, `{{${actionsKey}.${actionName}}}`)

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: expect.any(Function),
        })

        const actionRunner = runtimeProps.evaluatedProps[propKey]

        expect(actionRunner?.(5, 9)).toBe(14)
      },
    )

    it.each([
      ['actions', IPageKind.Provider],
      ['rootActions', IPageKind.Regular],
    ])('should bind %s with context in %s page', (actionsKey, pageKind) => {
      const { element, page, runtimeElement } = setupRuntimeElement(
        testbed,
        RendererType.Preview,
        pageKind,
      )

      const runtimeProps = runtimeElement.runtimeProps
      const actionName = 'sum'
      const propKey = 'propKey'

      testbed.addCodeAction({
        code: `function run(){
          return {
            props,
            state,
            refs,
            actions,
            rootState,
            rootActions,
            rootRefs
          };
        }`,
        name: actionName,
        store: page.providerPage?.store ?? element.store,
      })

      element.props.set(propKey, `{{${actionsKey}.${actionName}}}`)

      const actionRunner = runtimeProps.getActionRunner(actionName)

      expect(actionRunner()).toMatchObject({
        [actionsKey]: {
          [actionName]: expect.any(Function),
        },
        props: {
          [propKey]: expect.any(Function),
        },
      })
    })

    it.each([['successAction'], ['errorAction']])(
      'should bind %s with context',
      async (actionField) => {
        const { element, runtimeElement } = setupRuntimeElement(testbed)
        const runtimeProps = runtimeElement.runtimeProps
        const apiActionName = 'apiAction'
        const codeActionName = 'codeAction'
        const propKey = 'propKey'

        const codeAction = testbed.addCodeAction({
          code: `function run(response){
          return {
            props,
            state,
            refs,
            actions,
            rootState,
            rootActions,
            rootRefs
          };
        }`,
          name: codeActionName,
          store: element.store,
        })

        configure({ safeDescriptors: false })

        const resource = testbed.addResource({})

        jest.spyOn(resource, 'client', 'get').mockReturnValue({
          fetch: (config: IResourceFetchConfig) => {
            return Promise.resolve(
              actionField === 'successAction'
                ? {
                    data: {},
                  }
                : { error: 'some error' },
            )
          },
        })

        testbed.addApiAction({
          [actionField]: {
            __typename: 'CodeAction',
            id: codeAction.id,
          },
          name: apiActionName,
          resource: { id: resource.id },
          store: element.store,
        })

        element.props.set(propKey, `{{actions.${apiActionName}}}`)

        const actionRunner = runtimeProps.getActionRunner(apiActionName)

        expect(await actionRunner()).toMatchObject({
          actions: {
            [apiActionName]: expect.any(Function),
            [codeActionName]: expect.any(Function),
          },
          props: {
            [propKey]: expect.any(Function),
          },
        })

        configure({ safeDescriptors: true })
      },
    )

    it.each([['successAction'], ['errorAction']])(
      'should pass response as args to %s',
      async (actionField) => {
        const { element, runtimeElement } = setupRuntimeElement(testbed)
        const runtimeProps = runtimeElement.runtimeProps

        const response =
          actionField === 'successAction'
            ? { data: 35 }
            : { error: 'some error' }

        const apiActionName = 'apiAction'
        const codeActionName = 'successAction'

        const codeAction = testbed.addCodeAction({
          code: `function run(response){
          return response;
        }`,
          name: codeActionName,
          store: element.store,
        })

        configure({ safeDescriptors: false })

        const resource = testbed.addResource({})

        jest.spyOn(resource, 'client', 'get').mockReturnValue({
          fetch: (config: IResourceFetchConfig) => {
            return Promise.resolve(response)
          },
        })

        testbed.addApiAction({
          [actionField]: {
            __typename: 'CodeAction',
            id: codeAction.id,
          },
          name: apiActionName,
          resource: { id: resource.id },
          store: element.store,
        })

        const actionRunner = runtimeProps.getActionRunner(apiActionName)

        expect(await actionRunner()).toMatchObject(response)

        configure({ safeDescriptors: true })
      },
    )

    it.each([
      ['refs', IPageKind.Provider],
      ['rootRefs', IPageKind.Regular],
    ])('should evaluate ref expression with %s in %s', (refsKey, pageKind) => {
      const { rendererService } = rootApplicationStore
      const isProviderPage = pageKind === IPageKind.Provider

      const { element, page, rendered, runtimeElement } = setupRuntimeElement(
        testbed,
        RendererType.Preview,
      )

      const runtimeProps = runtimeElement.runtimeProps
      const propKey = 'propKey'
      const providerRootElement = page.providerPage?.rootElement.current

      const elementRefKey = isProviderPage
        ? element.slug
        : providerRootElement?.slug

      element.props.set(propKey, `{{${refsKey}.${elementRefKey}}}`)

      const { rerender } = render(
        React.createElement(
          StoreProvider,
          { value: rootApplicationStore },
          rendered,
        ),
      )

      expect(runtimeProps.evaluatedProps).toMatchObject({
        [propKey]: isProviderPage
          ? {
              // eslint-disable-next-line jest/no-conditional-expect
              current: expect.any(HTMLDivElement),
            }
          : undefined,
      })

      const atom = testbed.addAtom({
        __typename: 'Atom',
        name: 'HtmlSpan',
        type: IAtomType.HtmlSpan,
      })

      const targetElement = isProviderPage ? element : providerRootElement

      targetElement?.writeCache({
        renderType: {
          __typename: IElementRenderTypeKind.Atom,
          id: atom.id,
        },
      })

      rerender(
        React.createElement(
          StoreProvider,
          { value: rootApplicationStore },
          rendererService.activeRenderer?.current.render,
        ),
      )

      expect(runtimeProps.evaluatedProps).toMatchObject({
        [propKey]: {
          current: expect.any(HTMLSpanElement),
        },
      })
    })

    it.each([
      ['state', IPageKind.Provider],
      ['rootState', IPageKind.Regular],
    ])(
      'should re-evaluate prop expression with %s when state is changed via root action in %s',
      (stateKey, pageKind) => {
        const isProviderPage = pageKind === IPageKind.Provider

        const { element, page, runtimeElement } = setupRuntimeElement(
          testbed,
          RendererType.Preview,
          pageKind,
        )

        const runtimeProps = runtimeElement.runtimeProps
        const actionName = 'rootAction'
        const propKey = 'propKey'
        const rootStateName = 'rootStateName'
        const store = isProviderPage ? page.store : page.providerPage?.store
        const storeApi = store?.current.api.current

        const field = testbed.addField({
          api: storeApi,
          defaultValues: JSON.stringify('default value'),
          fieldType: testbed.getStringType(),
          key: rootStateName,
        })

        storeApi?.writeCache({ fields: [field] })

        testbed.addCodeAction({
          code: `function run() {
            state.${rootStateName} = "something";
          }`,
          name: actionName,
          store,
        })

        element.props.set(propKey, `{{${stateKey}.${rootStateName}}}`)

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'default value',
        })

        const actionRunner = runtimeProps.getActionRunner(actionName)

        actionRunner()

        expect(runtimeProps.evaluatedProps).toMatchObject({
          [propKey]: 'something',
        })
      },
    )

    it('should evaluate component expression', () => {
      const { runtimeElement } = setupRuntimeElement(testbed)
      const propKey = 'propKey'
      const propValue = 'propValue'

      const component = testbed.addComponent({
        name: 'component',
      })

      component.props.set(propKey, propValue)
      component.rootElement.current.props.set(
        propKey,
        `{{componentProps.${propKey}}}`,
      )

      runtimeElement.element.current.writeCache({
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const runtimeComponent = runtimeElement
        .children[0] as IRuntimeComponentModel

      const { runtimeProps } = runtimeComponent.runtimeRootElement
      const { evaluatedProps } = runtimeProps

      expect(evaluatedProps).toMatchObject({ [propKey]: propValue })
    })

    it('should evaluate url props expression', () => {
      const urlKey = 'urlKey'
      const urlPropValue = 'urlPropValue'

      rootApplicationStore.routerService.update({
        query: {
          [urlKey]: urlPropValue,
        },
      })

      const { element, page, renderer, runtimeElement } =
        setupRuntimeElement(testbed)

      element.props.set(urlKey, `{{urlProps.${urlKey}}}`)

      expect(runtimeElement.runtimeProps.evaluatedProps).toMatchObject({
        [urlKey]: urlPropValue,
      })
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
