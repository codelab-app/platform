import { StoreProvider } from '@codelab/frontend/application/shared/store'
import {
  IElementRenderTypeKind,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { screen, waitFor } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { unregisterRootStore } from 'mobx-keystone'
import React, { isValidElement } from 'react'
import { rootApplicationStore } from './setup/root.test.store'
import { TestBed } from './setup/testbed'

let testBed: TestBed

describe('TypedPropTransformers', () => {
  beforeEach(() => {
    testBed = TestBed.Create()
  })

  it('should apply default typed prop transformer', () => {
    const integerType = testBed.addPrimitiveType({
      name: IPrimitiveTypeKind.Integer,
      primitiveKind: IPrimitiveTypeKind.Integer,
    })

    const { element, runtimeElement } = testBed.setupRuntimeElement()
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
    const { element, runtimeElement } = testBed.setupRuntimeElement()
    const propKey = 'someNode'
    const reactNodeType = testBed.addReactNode({})
    const component = testBed.addComponent({})

    element.props.set(propKey, {
      kind: reactNodeType.kind,
      type: reactNodeType.id,
      value: component.id,
    })

    const renderedProp = runtimeElement.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp)).toBe(true)
  })

  it('should render props when kind is RenderPropsType', async () => {
    const { element, runtimeElement } = testBed.setupRuntimeElement()
    const propKey = 'someNode'
    const renderPropsType = testBed.addRenderProps({})
    const component = testBed.addComponent({})

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
    const { element, runtimeElement } = testBed.setupRuntimeElement()
    const propKey = 'someNode'
    const textPropKey = 'text'
    const textPropValue = 'some text value'
    const childrenExpression = `{{componentProps.${textPropKey}}}`
    const renderPropsType = testBed.addRenderProps({})
    const api = testBed.addInterfaceType({})

    api.writeCache({
      fields: [
        testBed.addField({
          api,
          defaultValues: JSON.stringify('some default value'),
          fieldType: testBed.getStringType(),
          key: textPropKey,
        }),
      ],
    })

    const component = testBed.addComponent({ api })

    const childElement = testBed.addElement({
      parentElement: component.rootElement.current,
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: testBed.getDivAtom()!.id,
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
