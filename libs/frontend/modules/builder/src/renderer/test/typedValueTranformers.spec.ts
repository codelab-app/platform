import { IRenderOutput, TypedValue } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { setupTestForRenderer } from './setup/setupTest'

describe('RenderService', () => {
  const data = setupTestForRenderer()

  it('should apply typed value transformers', () => {
    const { props } = data.renderService.renderIntermediateElement(
      data.elementToRender,
    ) as IRenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  // TODO figure out why ReactNodeType doesn't work in this test
  it.skip('should render props when typeKind is ReactNodeType', async () => {
    const extraProps = {
      someNode: {
        type: data.reactNodeType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderService.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { someNode } = props as any
    const { findByText } = render(someNode)

    expect(
      await findByText(data.componentRootElement.props?.get('text')),
    ).toBeInTheDocument()
  })

  it('should render props when typeKind is RenderPropsType', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropsType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderService.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { someNode } = props as any
    const { findByText } = render(someNode())

    expect(
      await findByText(data.componentRootElement.props?.get('text')),
    ).toBeInTheDocument()
  })

  it('should render props when typeKind is RenderPropsType with overriden props', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropsType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderService.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    const { someNode } = props as any
    const { findByText } = render(someNode({ text: 'new text' }))

    expect(await findByText('new text')).toBeInTheDocument()
  })
})
