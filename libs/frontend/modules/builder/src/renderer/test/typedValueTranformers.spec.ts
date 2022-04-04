import { TypedValue } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { RenderOutput } from '../abstract/RenderOutput'
import { setupTestRenderData } from './testData/renderData'

describe('RenderService', () => {
  const data = setupTestRenderData()

  it('should apply typed value transformers', () => {
    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
    ) as RenderOutput

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

    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

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

    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

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

    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    const { someNode } = props as any
    const { findByText } = render(someNode({ text: 'new text' }))

    expect(await findByText('new text')).toBeInTheDocument()
  })
})
