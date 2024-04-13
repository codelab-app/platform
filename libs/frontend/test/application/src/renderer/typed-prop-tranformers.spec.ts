import { StoreProvider } from '@codelab/frontend/application/shared/store'
import {
  IElementRenderTypeKind,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React, { isValidElement } from 'react'
import { setupRuntimeElement } from './setup'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testbed: TestBed

describe('TypedPropTransformers', () => {
  beforeEach(() => {
    testbed = TestBed.Create()
  })

  it('should apply default typed prop transformer', () => {
    const integerType = testbed.addPrimitiveType({
      name: IPrimitiveTypeKind.Integer,
      primitiveKind: IPrimitiveTypeKind.Integer,
    })

    const { element, runtimeElement } = setupRuntimeElement(testbed)
    const propKey = 'propKey'
    const propValue = 'propValue'

    element.props.set(propKey, {
      kind: integerType.kind,
      type: integerType.id,
      value: propValue,
    })

    expect(runtimeElement.runtimeProps.evaluatedProps).toMatchObject({
      [propKey]: propValue,
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    const { element, runtimeElement } = setupRuntimeElement(testbed)
    const propKey = 'someNode'
    const reactNodeType = testbed.addReactNode({})
    const component = testbed.addComponent({})

    element.props.set(propKey, {
      kind: reactNodeType.kind,
      type: reactNodeType.id,
      value: component.id,
    })

    const renderedProp = runtimeElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp)).toBe(true)
  })

  it('should render props when kind is RenderPropsType', async () => {
    const { element, runtimeElement } = setupRuntimeElement(testbed)
    const propKey = 'someNode'
    const renderPropsType = testbed.addRenderProps({})
    const component = testbed.addComponent({})

    element.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    expect(runtimeElement.runtimeProps.evaluatedProps).toMatchObject({
      [propKey]: expect.any(Function),
    })

    const renderedProp = runtimeElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp())).toBe(true)
  })

  it('should pass props to render props component', async () => {
    const { element, runtimeElement } = setupRuntimeElement(testbed)
    const propKey = 'someNode'
    const textPropKey = 'text'
    const textPropValue = 'some text value'
    const childrenExpression = `{{componentProps.${textPropKey}}}`
    const renderPropsType = testbed.addRenderProps({})
    const api = testbed.addInterfaceType({})

    api.writeCache({
      fields: [
        testbed.addField({
          api,
          defaultValues: JSON.stringify('some default value'),
          fieldType: testbed.getStringType(),
          key: textPropKey,
        }),
      ],
    })

    const component = testbed.addComponent({ api })

    const childElement = testbed.addElement({
      parentElement: component.rootElement.current,
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: testbed.getDivAtom()!.id,
      },
    })

    childElement.props.set('children', childrenExpression)

    component.rootElement.current.writeCache({ firstChild: childElement })

    element.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    const renderedProp = runtimeElement.runtimeProps.evaluatedProps[propKey]

    render(
      React.createElement(
        StoreProvider,
        { value: rootApplicationStore },
        renderedProp(textPropValue),
      ),
    )

    expect(await screen.findByText(textPropValue)).toBeInTheDocument()
  })

  afterAll(() => {
    unregisterRootStore(rootApplicationStore)
  })
})
