import { persistedPropsPipe } from './persistedPropsPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('PersistedPropsPipe', () => {
  it('should not add invalid data', () => {
    const propsWithInvalidData = {
      ...elementToRender.props,
      data: 'invalid  data',
    }

    const elementWithInvalidPropsData = {
      ...elementToRender,
      props: propsWithInvalidData,
    }

    const { props } = persistedPropsPipe(endPipe)(
      elementWithInvalidPropsData,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({})
  })

  it('should add persisted props', () => {
    const { props } = persistedPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: {
        typeKind: 'PrimitiveType',
        value: 'prop03Value',
      },
    })
  })
})
