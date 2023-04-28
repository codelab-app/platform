import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import { ComponentRenderPipe } from '../renderPipes/componentRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

const extraProps = {
  extra1: '01',
  extra2: '02',
}

describe('Renderer', () => {
  /**
   * Before all render pipes were built in to the renderer, now we extract and test only the ones we need
   */
  const {
    componentInstance,
    componentRootElement,
    pageRootElement,
    renderer,
    rootStore,
  } = setupTestForRenderer([ComponentRenderPipe])

  it('should add extra props', () => {
    const { props } = renderer.renderIntermediateElement(
      pageRootElement,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject(extraProps)
  })

  it('should apply transformation function', () => {
    const { props } = renderer.renderIntermediateElement(
      pageRootElement,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    pageRootElement.setPropTransformationJs('invalid fn')

    const { props } = renderer.renderIntermediateElement(
      pageRootElement,
      extraProps,
    ) as IRenderOutput

    expect(props).not.toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should render component instance', () => {
    const { atomType, props } = renderer.renderIntermediateElement(
      componentInstance,
      {},
    ) as IRenderOutput

    const clonedComponent = rootStore.componentService.clonedComponents.get(
      componentInstance.id,
    )

    expect(props).toMatchObject({
      [DATA_COMPONENT_ID]: clonedComponent?.id,
      ...componentInstance.props.current.values,
    })

    const componentAtomType = isAtomInstance(componentRootElement.renderType)
      ? componentRootElement.renderType.current.type
      : null

    expect(atomType).toBe(componentAtomType)
  })
})
