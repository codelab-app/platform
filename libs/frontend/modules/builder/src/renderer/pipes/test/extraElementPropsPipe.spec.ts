import { extraElementPropsPipe } from '../extraElementPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

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
