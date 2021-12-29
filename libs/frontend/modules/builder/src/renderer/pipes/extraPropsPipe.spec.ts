import { RenderProps } from '../../store'
import { renderPipeline } from '.'
import { extraPropsPipe } from './extraPropsPipe'
import { elementToRender, endPipe, EndPipeOutput, treeToRender } from './test'
import { RenderContext } from './types'

const extraProps: RenderProps = {
  extra1: '01',
  extra2: '02',
}

const defaultContext = {
  extraProps,
  render: renderPipeline,
  tree: treeToRender,
} as RenderContext

const initialProps = {
  a: 'b',
}

describe('ExtraElementPropsPipe', () => {
  it('should add element extra props', () => {
    const { props } = extraPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toEqual(expect.objectContaining(extraProps))
  })
})
