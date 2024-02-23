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
    it('should evaluate state field expression', () => {
      const { element, runtimeElement } = setupRuntimeElement(
        testbed,
        // set renderType to builder for state to update when changing field default values
        RendererType.PageBuilder,
      )

      const runtimeProps = runtimeElement?.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = 'some-value'
      const propKey = 'propKey'
      const storeApi = element.store.current.api.current

      const field = testbed.addField({
        api: storeApi,
        defaultValues: JSON.stringify(fieldDefaultValue),
        fieldType: testbed.getStringType(),
        key: fieldKey,
      })

      storeApi.writeCache({ fields: [field] })

      element.props.set(propKey, `{{state.${fieldKey}}}`)

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: fieldDefaultValue,
      })

      field.writeCache({ defaultValues: JSON.stringify('another-value') })

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: 'another-value',
      })
    })

    it('should evaluate root state field expression', () => {
      const { typeService } = rootApplicationStore

      const { element, page, runtimeElement } = setupRuntimeElement(
        testbed,
        // set renderType to builder for state to update when changing field default values
        RendererType.PageBuilder,
      )

      const runtimeProps = runtimeElement?.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = 'some-value'
      const propKey = 'propKey'
      const storeApi = page.providerPage?.store.current.api.current

      const field = testbed.addField({
        api: storeApi,
        defaultValues: JSON.stringify(fieldDefaultValue),
        fieldType: testbed.getStringType(),
        key: fieldKey,
      })

      storeApi?.writeCache({ fields: [field] })

      element.props.set(propKey, `{{rootState.${fieldKey}}}`)

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: fieldDefaultValue,
      })

      field.writeCache({ defaultValues: JSON.stringify('another-value') })

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: 'another-value',
      })
    })

    it('should evaluate action expression', () => {
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const actionName = 'sum'
      const propKey = 'propKey'

      testbed.addCodeAction({
        code: `function run(a,b){
          return a + b;
        }`,
        name: actionName,
        store: element.store,
      })

      element.props.set(propKey, `{{actions.${actionName}}}`)

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: expect.any(Function),
      })

      const actionRunner = runtimeProps?.evaluatedProps[propKey]

      expect(actionRunner?.(5, 9)).toBe(14)
    })

    it('should evaluate root action expression', () => {
      const { element, page, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const actionName = 'sum'
      const propKey = 'propKey'

      testbed.addCodeAction({
        code: `function run(a,b){
          return a + b;
        }`,
        name: actionName,
        store: page.providerPage?.store,
      })

      element.props.set(propKey, `{{rootActions.${actionName}}}`)

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: expect.any(Function),
      })

      const actionRunner = runtimeProps?.evaluatedProps[propKey]

      expect(actionRunner?.(5, 9)).toBe(14)
    })

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
      const { element, page, runtimeElement } = setupRuntimeElement(testbed)
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

    it('should evaluate ref expression', () => {
      const { rendererService } = rootApplicationStore
      const { element, rendered, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const propKey = 'propKey'

      element.props.set(propKey, `{{refs.${element.slug}}}`)

      const { rerender } = render(
        React.createElement(
          StoreProvider,
          { value: rootApplicationStore },
          rendered,
        ),
      )

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: {
          current: expect.any(HTMLDivElement),
        },
      })

      const atom = testbed.addAtom({
        __typename: 'Atom',
        name: 'HtmlSpan',
        type: IAtomType.HtmlSpan,
      })

      element.writeCache({
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

    it('should evaluate root ref expression', () => {
      const { rendererService } = rootApplicationStore

      const { element, page, rendered, runtimeElement } =
        setupRuntimeElement(testbed)

      const runtimeProps = runtimeElement?.runtimeProps
      const propKey = 'propKey'
      const providerRootElement = page.providerPage?.rootElement.current

      element.props.set(propKey, `{{rootRefs.${providerRootElement?.slug}}}`)

      const { rerender } = render(
        React.createElement(
          StoreProvider,
          { value: rootApplicationStore },
          rendered,
        ),
      )

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: undefined,
      })

      const atom = testbed.addAtom({
        __typename: 'Atom',
        name: 'HtmlSpan',
        type: IAtomType.HtmlSpan,
      })

      providerRootElement?.writeCache({
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

    it('should re-evaluate prop expression with state when state is changed via action', () => {
      const { element, page, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const actionName = 'rootAction'
      const propKey = 'propKey'
      const rootStateKey = 'rootStateKey'
      const storeApi = page.providerPage?.store.current.api.current

      const field = testbed.addField({
        api: storeApi,
        defaultValues: null,
        fieldType: testbed.getStringType(),
        key: rootStateKey,
      })

      storeApi?.writeCache({ fields: [field] })

      testbed.addCodeAction({
        code: `function run() {
          state.${rootStateKey} = "something";
        }`,
        name: actionName,
        store: page.providerPage?.store,
      })

      element.props.set(propKey, `{{state.${rootStateKey}}}`)

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: undefined,
      })

      // const actionRunner = runtimeProps?.evaluatedProps[propKey]
      const actionRunner = runtimeProps?.getActionRunner(actionName)

      actionRunner?.()

      expect(runtimeProps?.evaluatedProps).toMatchObject({
        [propKey]: 'something',
      })
    })
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
