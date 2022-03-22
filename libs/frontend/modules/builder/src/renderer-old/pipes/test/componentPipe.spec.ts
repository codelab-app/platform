import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { componentPipe } from './componentPipe'
import { componentRootElement, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('ComponentPipe', () => {
  it(`should add ${DATA_COMPONENT_ID} to prop`, () => {
    const { props } = componentPipe(endPipe)(
      componentRootElement,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props[DATA_COMPONENT_ID]).toEqual(componentRootElement.id)
  })

  it(`should add ${DATA_COMPONENT_ID} to context.extraProp`, () => {
    const { extraProps } = componentPipe(endPipe)(
      componentRootElement,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect((extraProps || {})[DATA_COMPONENT_ID]).toEqual(
      componentRootElement.id,
    )
  })
})
