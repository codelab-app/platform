import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
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
  const data = setupTestForRenderer([ComponentRenderPipe])

  it('should add extra props', () => {
    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject(extraProps)
  })

  it('should apply transformation function', () => {
    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    data.elementToRender.setPropTransformationJs('invalid fn')

    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
      extraProps,
    ) as IRenderOutput

    expect(props).not.toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should render component instance', () => {
    const { props, atomType } = data.renderer.renderIntermediateElement(
      data.componentInstanceElementToRender,
      {},
    ) as IRenderOutput

    const clonedComponent =
      data.rootStore.componentService.clonedComponents.get(
        data.componentInstanceElementToRender.id,
      )

    expect(props).toMatchObject({
      [DATA_COMPONENT_ID]: clonedComponent?.id,
      ...data.componentInstanceElementToRender.props.current.values,
    })

    expect(atomType).toBe(data.componentRootElement.renderType?.current.type)
  })
})
