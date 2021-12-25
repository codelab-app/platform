import { typedPropsPipe } from '../typedPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const defaultContext = {} as RenderContext
const initialProps = JSON.parse(elementToRender.props.data)

describe('TypedPropsPipe', () => {
  it('should transform props with type', () => {
    const { props } = typedPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: 'prop03Value',
    })
  })
})
