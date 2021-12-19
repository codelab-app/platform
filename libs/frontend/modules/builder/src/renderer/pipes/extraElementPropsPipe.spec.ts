import { extraElementPropsPipe } from './extraElementPropsPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const extraElementProps: RenderContext['extraElementProps'] = {
  [elementToRender.id]: {
    extra1: '01',
    extra2: '02',
  },
}

const defaultContext = { extraElementProps } as RenderContext
const initialProps = {}

describe('ExtraElementPropsPipe', () => {
  it('should add element extra props', () => {
    const { props } = extraElementPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual(extraElementProps[elementToRender.id])
  })
})
