import { overrideComponentPropsPipe } from './overrideComponentPropsPipe'
import {
  componentToRender,
  elementToRender03,
  endPipe,
  EndPipeOutput,
  treeToRender,
} from './test'
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

    const rootElementId = componentToRender.rootElement.id
    const passedProps = extraElementProps?.[rootElementId]

    expect(passedProps).toStrictEqual(initialProps)
  })
})
