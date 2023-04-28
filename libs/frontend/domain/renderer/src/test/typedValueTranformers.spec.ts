import type { IRenderOutput, TypedValue } from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { setupTestForRenderer } from './setup/setup-test'

describe('RenderService', () => {
  const {
    component,
    componentRootElement,
    pageRootElement: element,
    reactNodeType,
    renderer,
    renderPropType,
  } = setupTestForRenderer()

  it('should apply typed value transformers', () => {
    const { props } = renderer.renderIntermediateElement(
      element,
    ) as IRenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  it('should render props when kind is ReactNodeType', async () => {
    const extraProps = {
      someNode: {
        type: reactNodeType.id,
        value: component.id,
      } as TypedValue<string>,
    }

    const { props } = renderer.renderIntermediateElement(
      element,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode'])

    expect(
      await findByText(
        componentRootElement.props.maybeCurrent
          ?.get(CUSTOM_TEXT_PROP_KEY)
          ?.toString() ?? '',
      ),
    ).toBeInTheDocument()
  })

  it('should render props when kind is RenderPropType', async () => {
    const extraProps = {
      someNode: {
        type: renderPropType.id,
        value: component.id,
      } as TypedValue<string>,
    }

    const { props } = renderer.renderIntermediateElement(
      element,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode']())

    expect(
      await findByText(
        componentRootElement.props.maybeCurrent
          ?.get(CUSTOM_TEXT_PROP_KEY)
          ?.toString() ?? '',
      ),
    ).toBeInTheDocument()
  })

  it('should render props when kind is RenderPropType with overridden props', async () => {
    const extraProps = {
      someNode: {
        type: renderPropType.id,
        value: component.id,
      } as TypedValue<string>,
    }

    const { props } = renderer.renderIntermediateElement(
      element,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(
      props?.['someNode']({ [CUSTOM_TEXT_PROP_KEY]: 'new text' }),
    )

    expect(await findByText('new text')).toBeInTheDocument()
  })
})
