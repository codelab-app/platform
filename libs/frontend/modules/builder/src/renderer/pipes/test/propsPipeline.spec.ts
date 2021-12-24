import { IElement } from '@codelab/shared/abstract/core'
import { propsPipeline } from '../renderPipeline'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const defaultContext = {} as RenderContext
const initialProps = {}

const resultPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('PropsPipe', () => {
  it('should add props with type', () => {
    const restful = propsPipeline(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({
      __node: elementToRender,
      nodeid: elementToRender.id,
      key: elementToRender.id,
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: 'prop03Value',
    })
  })
})
