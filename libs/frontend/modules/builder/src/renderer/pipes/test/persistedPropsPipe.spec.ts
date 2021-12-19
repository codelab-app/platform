import { IElement } from '@codelab/shared/abstract/core'
import { persistedPropsPipe } from '../persistedPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const defaultContext = {} as RenderContext
const initialProps = {}

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

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

    const restful = persistedPropsPipe(restfulPipe)(
      elementWithInvalidPropsData,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({})
  })

  it('should add persisted props', () => {
    const restful = persistedPropsPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: {
        typeKind: 'PrimitiveType',
        value: 'prop03Value',
      },
    })
  })
})
