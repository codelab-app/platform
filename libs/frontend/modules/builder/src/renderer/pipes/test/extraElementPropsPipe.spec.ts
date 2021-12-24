import { extraElementPropsPipe } from '../extraElementPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

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
    const { props } = extraElementPropsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual(extraElementProps[elementToRender.id])
  })
})
