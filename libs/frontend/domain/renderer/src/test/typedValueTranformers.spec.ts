import { IRenderOutput, TypedValue } from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/domain/element'
import { render } from '@testing-library/react'
import { ReactElement } from 'react'
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

  interface CustomProps {
    someNode: (args?: unknown) => ReactElement
  }

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

    const { someNode } = props as CustomProps
    const { findByText } = render(someNode())

    expect(
      await findByText(data.componentRootElement.props?.get('text')),
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

    const { someNode } = props as CustomProps
    const { findByText } = render(someNode())

    expect(
      await findByText(
        data.componentRootElement.props?.get(CUSTOM_TEXT_PROP_KEY),
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

    const { someNode } = props as CustomProps

    const { findByText } = render(
      someNode({ [CUSTOM_TEXT_PROP_KEY]: 'new text' }),
    )

    expect(await findByText('new text')).toBeInTheDocument()
  })
})
