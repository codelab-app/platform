import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/domain'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import {
  IAtomType,
  IElementRenderTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React from 'react'
import { setupRuntimeElement } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('Runtime Element props', () => {
  beforeEach(() => {
    testbed = new TestBed()
  })

  afterEach(() => {
    rootApplicationStore.clear()
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
      const { typeService } = rootApplicationStore
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const atom = element.renderType.current
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = '"field-value"'

      const field = testbed.addField({
        api: atom.api.current,
        defaultValues: fieldDefaultValue,
        fieldType: typeService.typeDomainService.typesList.find(
          (type) =>
            type.kind === ITypeKind.PrimitiveType &&
            type.primitiveKind === IPrimitiveTypeKind.String,
        ),
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
      const { typeService } = rootApplicationStore
      const { element, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = 'some-value'
      const propKey = 'propKey'
      const storeApi = element.store.current.api.current

      const field = testbed.addField({
        api: storeApi,
        defaultValues: JSON.stringify(fieldDefaultValue),
        fieldType: typeService.typeDomainService.typesList.find(
          (type) =>
            type.kind === ITypeKind.PrimitiveType &&
            type.primitiveKind === IPrimitiveTypeKind.String,
        ),
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
      const { rendererService, typeService } = rootApplicationStore
      const { element, page, runtimeElement } = setupRuntimeElement(testbed)
      const runtimeProps = runtimeElement?.runtimeProps
      const fieldKey = 'fieldKey'
      const fieldDefaultValue = 'some-value'
      const propKey = 'propKey'
      const storeApi = page.providerPage?.store.current.api.current

      const field = testbed.addField({
        api: storeApi,
        defaultValues: JSON.stringify(fieldDefaultValue),
        fieldType: typeService.typeDomainService.typesList.find(
          (type) =>
            type.kind === ITypeKind.PrimitiveType &&
            type.primitiveKind === IPrimitiveTypeKind.String,
        ),
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
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
