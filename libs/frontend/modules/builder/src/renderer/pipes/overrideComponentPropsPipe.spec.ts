import { renderPipeline } from '../pipes'
import { overrideComponentProps } from './overrideComponentPropsPipe'
import { elementToRender03, endPipe, EndPipeOutput, treeToRender } from './test'
import { RenderContext } from './types'

const defaultContext = {
  tree: treeToRender,
  render: renderPipeline,
} as RenderContext

const initialProps = {
  props01: 'prop01-value',
}

describe('OverrideComponentPropsPipe', () => {
  it('should add component id with props to context.extraElementProps', () => {
    const { props } = overrideComponentProps(endPipe)(
      elementToRender03,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const componentId = elementToRender03.instanceOfComponent?.id as string
    const passedProps = props.context.extraElementProps[componentId]

    expect(passedProps).toStrictEqual(initialProps)
  })
})
