import {
  createTestStore,
  TestStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import React, { isValidElement } from 'react'

describe('TypedPropTransformers', () => {
  let testStore: ReturnType<typeof createTestStore>

  beforeEach(() => {
    testStore = createTestStore()
  })

  afterEach(() => {
    testStore.teardown()
  })

  it('should apply default typed prop transformer', () => {
    const integerType = testStore.addPrimitiveType({
      name: IPrimitiveTypeKind.Integer,
      primitiveKind: IPrimitiveTypeKind.Integer,
    })

    const { rootElement, runtimeRootElement } = testStore.setupRuntimeElement()
    const propKey = 'propKey'
    const propValue = 'propValue'

    rootElement.props.set(propKey, {
      kind: integerType.kind,
      type: integerType.id,
      value: propValue,
    })

    expect(runtimeRootElement.runtimeProps.evaluatedProps).toMatchObject({
      [propKey]: propValue,
    })
  })

  it('should render props when kind is ReactNodeType', () => {
    const { rootElement, runtimeRootElement } = testStore.setupRuntimeElement()
    const propKey = 'someNode'
    const reactNodeType = testStore.addReactNodeType({})
    const component = testStore.addComponent({})

    rootElement.props.set(propKey, {
      kind: reactNodeType.kind,
      type: reactNodeType.id,
      value: component.id,
    })

    const renderedProp = runtimeRootElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp)).toBe(true)
  })

  it('should render props when kind is RenderPropsType', () => {
    const { rootElement, runtimeRootElement } = testStore.setupRuntimeElement()
    const propKey = 'someNode'
    const renderPropsType = testStore.addRenderPropsType({})
    const component = testStore.addComponent({})

    rootElement.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    expect(runtimeRootElement.runtimeProps.evaluatedProps).toMatchObject({
      [propKey]: expect.any(Function),
    })

    const renderedProp = runtimeRootElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp())).toBe(true)
  })

  it('should pass props to render props component', async () => {
    const { rootElement, runtimeRootElement } = testStore.setupRuntimeElement()
    const propKey = 'someNode'
    const textPropKey = 'text'
    const textPropValue = 'some text value'
    const childrenExpression = `{{componentProps.${textPropKey}}}`
    const renderPropsType = testStore.addRenderPropsType({})
    const codeMirrorType = testStore.addCodeMirrorType({})
    const api = testStore.addInterfaceType({})

    api.writeCache({
      fields: [
        testStore.addField({
          api,
          defaultValues: JSON.stringify('some default value'),
          fieldType: testStore.getStringType(),
          key: textPropKey,
        }),
      ],
    })

    const component = testStore.addComponent({ api })

    const childElement = testStore.addElement({
      parentElement: component.rootElement.current,
      renderType: testStore.getAtomByType(IAtomType.HtmlDiv),
    })

    childElement.props.set('children', {
      kind: codeMirrorType.kind,
      type: codeMirrorType.id,
      value: childrenExpression,
    })

    component.rootElement.current.writeCache({ firstChild: childElement })

    rootElement.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    const renderedProp = runtimeRootElement.runtimeProps.evaluatedProps[propKey]

    render(
      React.createElement(
        TestStoreProvider,
        { value: testStore },
        renderedProp(textPropValue),
      ),
    )

    expect(await screen.findByText(textPropValue)).toBeInTheDocument()
  })
})
