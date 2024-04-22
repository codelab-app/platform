import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createTestApplication } from '@codelab/frontend/application/test'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React, { isValidElement } from 'react'

describe('TypedPropTransformers', () => {
  let testApplication: ReturnType<typeof createTestApplication>

  beforeEach(() => {
    testApplication = createTestApplication()
  })

  it('should apply default typed prop transformer', () => {
    const integerType = testApplication.addPrimitiveType({
      name: IPrimitiveTypeKind.Integer,
      primitiveKind: IPrimitiveTypeKind.Integer,
    })

    const { rootElement, runtimeRootElement } =
      testApplication.setupRuntimeElement()

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

  it('should render props when kind is ReactNodeType', async () => {
    const { rootElement, runtimeRootElement } =
      testApplication.setupRuntimeElement()

    const propKey = 'someNode'
    const reactNodeType = testApplication.addReactNode({})
    const component = testApplication.addComponent({})

    rootElement.props.set(propKey, {
      kind: reactNodeType.kind,
      type: reactNodeType.id,
      value: component.id,
    })

    const renderedProp = runtimeRootElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp)).toBe(true)
  })

  it('should render props when kind is RenderPropsType', async () => {
    const { rootElement, runtimeRootElement } =
      testApplication.setupRuntimeElement()

    const propKey = 'someNode'
    const renderPropsType = testApplication.addRenderProps({})
    const component = testApplication.addComponent({})

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
    const { rootElement, runtimeRootElement } =
      testApplication.setupRuntimeElement()

    const propKey = 'someNode'
    const textPropKey = 'text'
    const textPropValue = 'some text value'
    const childrenExpression = `{{componentProps.${textPropKey}}}`
    const renderPropsType = testApplication.addRenderProps({})
    const api = testApplication.addInterfaceType({})

    api.writeCache({
      fields: [
        testApplication.addField({
          api,
          defaultValues: JSON.stringify('some default value'),
          fieldType: testApplication.getStringType(),
          key: textPropKey,
        }),
      ],
    })

    const component = testApplication.addComponent({ api })

    const childElement = testApplication.addElement({
      parentElement: component.rootElement.current,
      renderType: testApplication.getAtomByType(IAtomType.HtmlDiv),
    })

    childElement.props.set('children', childrenExpression)

    component.rootElement.current.writeCache({ firstChild: childElement })

    rootElement.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    const renderedProp = runtimeRootElement.runtimeProps.evaluatedProps[propKey]

    render(
      React.createElement(
        StoreProvider,
        { value: testApplication.rootStore },
        renderedProp(textPropValue),
      ),
    )

    expect(await screen.findByText(textPropValue)).toBeInTheDocument()
  })

  afterAll(() => {
    testApplication.teardown()
  })
})
