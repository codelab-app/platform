import type { IRenderOutput, TypedValue } from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { setupTestForRenderer } from './setup/setupTest'

describe('RenderService', () => {
  const data = setupTestForRenderer()

  it('should apply typed value transformers', () => {
    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
    ) as IRenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  // TODO figure out why ReactNodeType doesn't work in this test
  it('should render props when kind is ReactNodeType', async () => {
    const extraProps = {
      someNode: {
        type: data.reactNodeType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode'])

    expect(
      await findByText(
        data.componentRootElement.props?.get(CUSTOM_TEXT_PROP_KEY).toString() ??
          '',
      ),
    ).toBeInTheDocument()
  })

  it('should render props when kind is RenderPropsType', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropsType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(props?.['someNode']())

    expect(
      await findByText(
        data.componentRootElement.props?.get(CUSTOM_TEXT_PROP_KEY).toString() ??
          '',
      ),
    ).toBeInTheDocument()
  })

  it('should render props when kind is RenderPropsType with overridden props', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropsType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { findByText } = render(
      props?.['someNode']({ [CUSTOM_TEXT_PROP_KEY]: 'new text' }),
    )

    expect(await findByText('new text')).toBeInTheDocument()
  })
})
