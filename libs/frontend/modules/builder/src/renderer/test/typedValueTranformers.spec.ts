import { TypedValue } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import { RenderOutput } from '../abstract/RenderOutput'
import { react } from '../ElementWrapper'
import { setupTestRenderData } from './testData/renderData'

describe('RenderService', () => {
  const data = setupTestRenderData()

  it('should apply typed value transformers', () => {
    const { props } = data.renderService.renderElement(
      data.elementToRender,
    ) as RenderOutput

    expect(props).toMatchObject({
      prop03: 'prop03Value',
    })
  })

  it('should render props when typeKind is ReactNodeType', async () => {
    const extraProps = {
      someNode: {
        type: data.reactNodeType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderService.renderElement(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    const { someNode } = props
    const { findByText } = render(someNode)

    expect(
      await findByText(data.componentRootElement.props.get('text')),
    ).toBeInTheDocument()
  })

  it('should render props when typeKind is RenderPropsType', async () => {
    const extraProps = {
      someNode: {
        type: data.renderPropsType.id,
        value: data.componentToRender.id,
      } as TypedValue<string>,
    }

    const { props } = data.renderService.renderElement(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    const { someNode } = props
    const { findByText } = render(react(someNode))

    expect(
      await findByText(data.componentRootElement.props.get('text')),
    ).toBeInTheDocument()
  })
})
