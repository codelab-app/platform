import { componentPipe } from './componentPipe'
import { componentToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('ComponentPipe', () => {
  it('should add data-component-id to prop', () => {
    const { props } = componentPipe(endPipe)(
      componentToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props['data-component-id']).toEqual(componentToRender.id)
  })

  it('should add data-component-id to context.extraProp', () => {
    const { extraProps } = componentPipe(endPipe)(
      componentToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect((extraProps || {})['data-component-id']).toEqual(
      componentToRender.id,
    )
  })
})
