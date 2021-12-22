import { IElement } from '@codelab/shared/abstract/core'
import { typedPropsPipe } from '../typedPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const defaultContext = {} as RenderContext
const initialProps = JSON.parse(elementToRender.props.data)

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('typedPropsPipe', () => {
  it('should transform props with type', () => {
    const restful = typedPropsPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: 'prop03Value',
    })
  })
})
