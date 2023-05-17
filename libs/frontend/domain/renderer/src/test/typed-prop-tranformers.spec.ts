import type { IRenderOutput, TypedProp } from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { setupTestForRenderer } from './setup/setup-test'
import TestProviderWrapper from './TestProviderWrapper'

describe('RenderService', () => {
  const data = setupTestForRenderer()

  it('should apply typed value transformers', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    const extraProps = {
      someNode: {
        type: data.reactNodeType.id,
        value: data.component.id,
      } as TypedProp,
    }

    const text = 'some text'

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      text,
    )

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode'], {
      wrapper: TestProviderWrapper(data.rootStore),
    })

    expect(await findByText(text)).toBeInTheDocument()
  })

  it('should render prop when kind is RenderPropType with component prop values', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropType.id,
        value: data.component.id,
      } as TypedProp,
    }

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      `{{this.${data.textField.key}}}`,
    )

    const text = 'some text'
    data.component.props.current.set(data.textField.key, text)

    const { findByText } = render(props?.['someNode'](), {
      wrapper: TestProviderWrapper(data.rootStore),
    })

    expect(await findByText(text)).toBeInTheDocument()
  })

  it.skip('should render props when kind is RenderPropType with passed arguments (override component props)', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropType.id,
        value: data.component.id,
      } as TypedProp,
    }

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    data.component.rootElement.current.props.current.set(
      CUSTOM_TEXT_PROP_KEY,
      `{{this.${data.textField.key}}}`,
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
