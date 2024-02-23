import {
  type IRuntimeContainerNodeModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
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
import { setupRegularPageRuntimeElement, setupRuntimeElement } from './setup'
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
      const runtimeProps = runtimeElement?.runtimeProps

      expect(runtimeProps?.props).toMatchObject({
        [DATA_ELEMENT_ID]: element.id,
        key: element.id,
        ref: expect.any(Function),
      })
    })

    it('should contain element props', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps

      element.props.set('randomProp', 'RandomPropValue')

      expect(runtimeProps?.props).toMatchObject({
        randomProp: 'RandomPropValue',
      })
    })

    it('should contain default props', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
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

      expect(runtimeProps?.props).toMatchObject({
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
        const isProviderPage = pageKind === IPageKind.Provider

        // set renderType to builder for state to update when changing field default values
        const { element, page, runtimeElement } = isProviderPage
          ? setupRuntimeElement(testbed, RendererType.PageBuilder)
          : setupRegularPageRuntimeElement(testbed, RendererType.PageBuilder)

        const runtimeProps = runtimeElement?.runtimeProps
        const fieldKey = 'fieldKey'
        const fieldDefaultValue = 'some-value'
        const propKey = 'propKey'
        const store = isProviderPage ? element.store : page.providerPage?.store
        const storeApi = store?.current.api.current

        const field = testbed.addField({
          api: storeApi,
          defaultValues: JSON.stringify(fieldDefaultValue),
          fieldType: testbed.getStringType(),
          key: fieldKey,
        })

        storeApi?.writeCache({ fields: [field] })

        element.props.set(propKey, `{{${stateKey}.${fieldKey}}}`)

        expect(runtimeProps?.evaluatedProps).toMatchObject({
          [propKey]: fieldDefaultValue,
        })

        field.writeCache({ defaultValues: JSON.stringify('another-value') })

        expect(runtimeProps?.evaluatedProps).toMatchObject({
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

        const { element, page, runtimeElement } = isProviderPage
          ? setupRuntimeElement(testbed)
          : setupRegularPageRuntimeElement(testbed)

        const runtimeProps = runtimeElement?.runtimeProps
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

        expect(runtimeProps?.evaluatedProps).toMatchObject({
          [propKey]: expect.any(Function),
        })

        const actionRunner = runtimeProps?.evaluatedProps[propKey]

        expect(actionRunner?.(5, 9)).toBe(14)
      },
    )

    it('should bind action with context', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
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
        store: element.store,
      })

      element.props.set(propKey, `{{actions.${actionName}}}`)

      const actionRunner = runtimeProps?.getActionRunner(actionName)

      expect(actionRunner?.()).toMatchObject({
        actions: {
          [actionName]: expect.any(Function),
        },
        props: {
          [propKey]: expect.any(Function),
        },
      })
    })

    it('should bind success action with context', async () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const apiActionName = 'apiAction'
      const successActionName = 'successAction'
      const propKey = 'propKey'

      const successAction = testbed.addCodeAction({
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
        name: successActionName,
        store: element.store,
      })

      configure({ safeDescriptors: false })

      const resource = testbed.addResource({})

      jest.spyOn(resource, 'client', 'get').mockReturnValue({
        fetch: (config: IResourceFetchConfig) => {
          return Promise.resolve({
            data: {},
          })
        },
      })

      testbed.addApiAction({
        name: apiActionName,
        resource: { id: resource.id },
        store: element.store,
        successAction: {
          __typename: 'CodeAction',
          id: successAction.id,
        },
      })

      element.props.set(propKey, `{{actions.${apiActionName}}}`)

      const actionRunner = runtimeProps?.getActionRunner(apiActionName)

      expect(await actionRunner?.()).toMatchObject({
        actions: {
          [apiActionName]: expect.any(Function),
          [successActionName]: expect.any(Function),
        },
        props: {
          [propKey]: expect.any(Function),
        },
      })

      configure({ safeDescriptors: true })
    })

    it('should pass response as args to success action', async () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const response = { data: 35 }
      const propKey = 'propKey'
      const apiActionName = 'apiAction'
      const successActionName = 'successAction'

      const successAction = testbed.addCodeAction({
        code: `function run(response){
          return response;
        }`,
        name: successActionName,
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
        name: apiActionName,
        resource: { id: resource.id },
        store: element.store,
        successAction: {
          __typename: 'CodeAction',
          id: successAction.id,
        },
      })

      element.props.set(propKey, `{{actions.${apiActionName}}}`)

      const actionRunner = runtimeProps?.getActionRunner(apiActionName)

      expect(await actionRunner?.()).toMatchObject(response)

      configure({ safeDescriptors: true })
    })

    it('should bind error action with context', async () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const apiActionName = 'apiAction'
      const errorActionName = 'errorAction'
      const propKey = 'propKey'

      const errorAction = testbed.addCodeAction({
        code: `function run(error){
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
        name: errorActionName,
        store: element.store,
      })

      configure({ safeDescriptors: false })

      const resource = testbed.addResource({})

      jest.spyOn(resource, 'client', 'get').mockReturnValue({
        fetch: (config: IResourceFetchConfig) => {
          return Promise.resolve({ error: 'some error' })
        },
      })

      testbed.addApiAction({
        errorAction: {
          __typename: 'CodeAction',
          id: errorAction.id,
        },
        name: apiActionName,
        resource: { id: resource.id },
        store: element.store,
      })

      element.props.set(propKey, `{{actions.${apiActionName}}}`)

      const actionRunner = runtimeProps?.getActionRunner(apiActionName)

      expect(await actionRunner?.()).toMatchObject({
        actions: {
          [apiActionName]: expect.any(Function),
          [errorActionName]: expect.any(Function),
        },
        props: {
          [propKey]: expect.any(Function),
        },
      })

      configure({ safeDescriptors: true })
    })

    it('should pass error response as args to error action', async () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const apiActionName = 'apiAction'
      const errorActionName = 'errorAction'
      const error = { error: 'some error' }

      const errorAction = testbed.addCodeAction({
        code: `function run(error){
          return error;
        }`,
        name: errorActionName,
        store: element.store,
      })

      configure({ safeDescriptors: false })

      const resource = testbed.addResource({})

      jest.spyOn(resource, 'client', 'get').mockReturnValue({
        fetch: (config: IResourceFetchConfig) => {
          return Promise.resolve(error)
        },
      })

      testbed.addApiAction({
        errorAction: {
          __typename: 'CodeAction',
          id: errorAction.id,
        },
        name: apiActionName,
        resource: { id: resource.id },
        store: element.store,
      })

      const actionRunner = runtimeProps?.getActionRunner(apiActionName)

      expect(await actionRunner?.()).toMatchObject(error)

      configure({ safeDescriptors: true })
    })

    it('should bind root action with context', () => {
      const { element, page, runtimeElement } =
        setupRegularPageRuntimeElement(testbed)

      const runtimeProps = runtimeElement?.runtimeProps
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
        store: page.providerPage?.store,
      })

      element.props.set(propKey, `{{rootActions.${actionName}}}`)

      const actionRunner = runtimeProps?.getActionRunner(actionName)

      expect(actionRunner?.()).toMatchObject({
        props: {
          [propKey]: expect.any(Function),
        },
        rootActions: {
          [actionName]: expect.any(Function),
        },
      })
    })

    it.each([
      ['refs', IPageKind.Provider],
      ['rootRefs', IPageKind.Regular],
    ])('should evaluate ref expression with %s in %s', (refsKey, pageKind) => {
      const { rendererService } = rootApplicationStore
      const isProviderPage = pageKind === IPageKind.Provider

      const { element, page, rendered, runtimeElement } = isProviderPage
        ? setupRuntimeElement(testbed)
        : setupRegularPageRuntimeElement(testbed)

      const runtimeProps = runtimeElement?.runtimeProps
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

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: isProviderPage
          ? {
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

      expect(runtimeProps?.evaluatedProps).toMatchObject({
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

        const { element, page, runtimeElement } = isProviderPage
          ? setupRuntimeElement(testbed)
          : setupRegularPageRuntimeElement(testbed)

        const runtimeProps = runtimeElement?.runtimeProps
        const actionName = 'rootAction'
        const propKey = 'propKey'
        const rootStateName = 'rootStateName'
        const store = isProviderPage ? page.store : page.providerPage?.store
        const storeApi = store?.current.api.current

        const field = testbed.addField({
          api: storeApi,
          defaultValues: 'default value',
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

        expect(runtimeProps?.evaluatedProps).toMatchObject({
          [propKey]: 'default value',
        })

        const actionRunner = runtimeProps?.getActionRunner(actionName)

        actionRunner?.()

        expect(runtimeProps?.evaluatedProps).toMatchObject({
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

      runtimeElement?.element.current.writeCache({
        renderType: {
          __typename: IElementRenderTypeKind.Component,
          id: component.id,
        },
      })

      const runtimeComponent = runtimeElement
        ?.children[0] as IRuntimeContainerNodeModel

      const { runtimeProps } = runtimeComponent.runtimeRootElement
      const { evaluatedProps } = runtimeProps

      expect(evaluatedProps).toMatchObject({ [propKey]: propValue })
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
