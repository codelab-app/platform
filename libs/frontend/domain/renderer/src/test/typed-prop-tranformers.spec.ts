import './mock/match-media.mock'
import type { IRenderOutput, TypedProp } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { setupTestForRenderer } from './setup/setup-test'
import TestProviderWrapper from './TestProviderWrapper'

describe('RenderService', () => {
  // Passing Preview renderer to replace customText prop value
  const data = setupTestForRenderer([], RendererType.Preview)

  it('should apply typed value transformers', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    data.element.props.current.setMany({
      someNode: {
        kind: data.reactNodeType.kind,
        type: data.reactNodeType.id,
        value: data.component.id,
      } as TypedProp,
    })

    const text = 'some text'

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      text,
    )

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode'], {
      wrapper: TestProviderWrapper(data.rootStore),
    })

    expect(await findByText(text)).toBeInTheDocument()
  })

  it('should render prop when kind is RenderPropType with component prop values', async () => {
    data.element.props.current.setMany({
      someNode: {
        kind: data.renderPropType.kind,
        type: data.renderPropType.id,
        value: data.component.id,
      } as TypedProp,
    })

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      `{{componentProps.${data.textField.key}}}`,
    )

    const text = 'some text'
    data.component.props.current.set(data.textField.key, text)

    const { findByText } = render(props?.['someNode'](), {
      wrapper: TestProviderWrapper(data.rootStore),
    })

    expect(await findByText(text)).toBeInTheDocument()
  })

  it('should render props when kind is RenderPropType with passed arguments (override component props)', async () => {
    data.element.props.current.setMany({
      someNode: {
        kind: data.renderPropType.kind,
        type: data.renderPropType.id,
        value: data.component.id,
      },
    })

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      `{{componentProps.${data.textField.key}}}`,
    )

    // component props values
    const text = 'some text'
    data.component.props.current.set(data.textField.key, text)

    // passed arguments
    const anotherText = 'anotherText'

    const { findByText } = render(props?.['someNode'](anotherText), {
      wrapper: TestProviderWrapper(data.rootStore),
    })

    expect(await findByText(anotherText)).toBeInTheDocument()
  })
})
