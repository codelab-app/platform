import { TypeKind } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { renderPropsPipe } from '../renderPropsPipe'
import { RenderContext } from '../types'
import { elementGraph, elementToRender } from './data'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const tree = new ElementTree(elementGraph)

const defaultContext = {
  tree,
} as RenderContext

const initialProps = {
  component01: {
    typeKind: TypeKind.RenderPropsType,
  },
}

describe('RenderPropsPipe', () => {
  it('should transform props with type', () => {
    const { props } = renderPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({})
  })
})
