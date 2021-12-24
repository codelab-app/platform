import { typedPropsPipe } from '../typedPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const defaultContext = {} as RenderContext
const initialProps = JSON.parse(elementToRender.props.data)

describe('typedPropsPipe', () => {
  it('should transform props with type', () => {
    const { props } = typedPropsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: 'prop03Value',
    })
  })
})
