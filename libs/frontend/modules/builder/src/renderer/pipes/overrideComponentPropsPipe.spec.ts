import { overrideComponentPropsPipe } from './overrideComponentPropsPipe'
import { elementToRender03, endPipe, EndPipeOutput, treeToRender } from './test'
import { RenderContext } from './types'

const defaultContext = {
  tree: treeToRender,
  render: endPipe,
} as RenderContext

const initialProps = {
  props01: 'prop01-value',
}

describe('OverrideComponentPropsPipe', () => {
  it('should add component id with props to context.extraElementProps', () => {
    const { extraElementProps } = overrideComponentPropsPipe(() => undefined)(
      elementToRender03,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const componentId = elementToRender03.instanceOfComponent?.id as string
    const passedProps = extraElementProps?.[componentId]

    expect(passedProps).toStrictEqual(initialProps)
  })
})
