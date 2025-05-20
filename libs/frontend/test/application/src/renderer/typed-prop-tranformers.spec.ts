import {
  createTestStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { createElement, isValidElement } from 'react'

describe('TypedPropTransformers', () => {
  let storeContext: ReturnType<typeof createTestStore>
  let testStore: ReturnType<typeof createTestStore>['rootStore']

  beforeEach(() => {
    storeContext = createTestStore()
    testStore = storeContext.rootStore
  })

  afterEach(() => {
    testStore.teardown()
  })

  it('should apply default typed prop transformer', () => {
    const integerType = testStore.addPrimitiveType({
      name: IPrimitiveTypeKind.Integer,
      primitiveKind: IPrimitiveTypeKind.Integer,
    })

    const { renderer, rootElement, runtimeRootElement } =
      testStore.setupRuntimeElement()

    const propKey = 'propKey'
    const propValue = 'propValue'

    rootElement.props.set(propKey, {
      kind: integerType.kind,
      type: integerType.id,
      value: propValue,
    })

    renderer.render()

    expect(
      runtimeRootElement.current.runtimeProps.evaluatedProps,
    ).toMatchObject({
      [propKey]: propValue,
    })
  })

  it('should render props when kind is ReactNodeType', () => {
    const { renderer, rootElement, runtimeRootElement } =
      testStore.setupRuntimeElement()

    const propKey = 'someNode'
    const reactNodeType = testStore.addReactNodeType({})
    const component = testStore.addComponent({})

    rootElement.props.set(propKey, {
      kind: reactNodeType.kind,
      type: reactNodeType.id,
      value: component.id,
    })

    renderer.render()

    const renderedProp =
      runtimeRootElement.current.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp)).toBeTruthy()
  })

  it('should render props when kind is RenderPropsType', () => {
    const { renderer, rootElement, runtimeRootElement } =
      testStore.setupRuntimeElement()

    const propKey = 'someNode'
    const renderPropsType = testStore.addRenderPropsType({})
    const component = testStore.addComponent({})

    rootElement.props.set(propKey, {
      kind: renderPropsType.kind,
      type: renderPropsType.id,
      value: component.id,
    })

    renderer.render()

    expect(
      runtimeRootElement.current.runtimeProps.evaluatedProps,
    ).toMatchObject({
      [propKey]: expect.any(Function),
    })

    const renderedProp =
      runtimeRootElement.current.runtimeProps.evaluatedProps[propKey]

    expect(isValidElement(renderedProp())).toBeTruthy()
  })

  it('should pass props to render props component', async () => {
    const { renderer, rootElement, runtimeRootElement } =
      testStore.setupRuntimeElement()

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

    renderer.render()

    const renderedProp =
      runtimeRootElement.current.runtimeProps.evaluatedProps[propKey]

    render(
      createElement(
        RootStoreProvider,
        { value: storeContext },
        renderedProp(textPropValue),
      ),
    )

    expect(await screen.findByText(textPropValue)).toBeInTheDocument()
  })
})
