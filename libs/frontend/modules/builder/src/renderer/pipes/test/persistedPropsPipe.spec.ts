import { persistedPropsPipe } from '../persistedPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

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

    const { props } = persistedPropsPipe(resultPipe)(
      elementWithInvalidPropsData,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual({})
  })

  it('should add persisted props', () => {
    const { props } = persistedPropsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

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
