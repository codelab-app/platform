import { TypeKind } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { merge } from 'lodash'
import { renderPipeline } from '../renderPipeline'
import { renderPropsPipe } from '../renderPropsPipe'
import { RenderContext } from '../types'
import { componentToRender, elementGraph, elementToRender } from './data'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const tree = new ElementTree(elementGraph)

const defaultContext = {
  tree,
  render: renderPipeline,
} as RenderContext

const initialProps = {
  renderInput: {
    typeKind: TypeKind.RenderPropsType,
    id: componentToRender.id,
    text: 'random-text',
  },
}

describe('RenderPropsPipe', () => {
  it('should render RenderContainer with correct component', () => {
    const { props } = renderPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const RenderComponentFn = props.renderInput
    const rendered = RenderComponentFn() // the reason we use it as function is to be able to access props

    expect(rendered.props.element).toEqual(componentToRender)
  })

  it('should render RenderContainer with correct props', () => {
    const { props } = renderPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const additionalProps = { text: 'abc' }
    const RenderComponentFn = props.renderInput
    const rendered = RenderComponentFn(additionalProps)

    expect(rendered.props.props).toEqual(merge(initialProps, additionalProps))
  })
})
