import { IElement } from '@codelab/shared/abstract/core'
import { ReactElement } from 'react'
import { loopingRenderPipe } from '../loopRenderingPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const defaultContext = {} as RenderContext

const initialProps = {
  [elementToRender.renderForEachPropKey as string]: [
    { prop01: 'prop01Value' },
    { prop02: 'prop02Value' },
    { prop03: 'prop03Value' },
    { prop04: 'prop04Value' },
  ],
}

const resultPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('LoopingRenderPipe', () => {
  it('should add renderForEachPropKey props', () => {
    const restful = loopingRenderPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect((restful as ReactElement).props.children).toStrictEqual([
      {
        key: `${elementToRender.id}-0`,
        prop01: 'prop01Value',
        ...initialProps,
      },
      {
        key: `${elementToRender.id}-1`,
        prop02: 'prop02Value',
        ...initialProps,
      },
      {
        key: `${elementToRender.id}-2`,
        prop03: 'prop03Value',
        ...initialProps,
      },
      {
        key: `${elementToRender.id}-3`,
        prop04: 'prop04Value',
        ...initialProps,
      },
    ])
  })
})
