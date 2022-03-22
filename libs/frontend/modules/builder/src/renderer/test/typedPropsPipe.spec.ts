import { elementToRender, endPipe, EndPipeOutput, primitiveType } from './test'
import { typedPropsPipe } from './typedPropsPipe'
import { RenderContext } from './types'

const typesById = { [primitiveType.id]: primitiveType }
const defaultContext = { typesById } as RenderContext
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
