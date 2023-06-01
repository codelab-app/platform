import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import { ComponentRenderPipe } from '../renderPipes/component-render-pipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('Renderer', () => {
  /**
   * Before all render pipes were built in to the renderer, now we extract and test only the ones we need
   */
  const data = setupTestForRenderer([ComponentRenderPipe])

  it('should apply transformation function', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    expect(props).toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    data.element.setPropTransformationJs('invalid fn')

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
    ) as IRenderOutput

    expect(props).not.toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should render component instance', () => {
    const { atomType, props } =
      data.rootStore.renderer.renderIntermediateElement(
        data.componentInstance,
      ) as IRenderOutput

    const clonedComponent =
      data.rootStore.componentService.clonedComponents.get(
        data.componentInstance.id,
      )

    const rootElement = clonedComponent?.rootElement.current
    const rootElementProps = rootElement?.runtimeProp?.evaluatedProps || {}

    expect(props).toMatchObject(rootElementProps)

    const componentAtomType =
      rootElement && isAtomInstance(rootElement.renderType)
        ? rootElement.renderType.current.type
        : null

    expect(atomType).toBe(componentAtomType)
  })

  it('should have props with a replaced expression using the instance prop value', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.componentInstance,
    ) as IRenderOutput

    const clonedComponent =
      data.rootStore.componentService.clonedComponents.get(
        data.componentInstance.id,
      )

    const rootElement = clonedComponent?.rootElement.current
    const rootElementProps = rootElement?.runtimeProp?.evaluatedProps || {}

    expect(props).toMatchObject({
      ...rootElementProps,
      [DATA_COMPONENT_ID]: clonedComponent?.id,
      expressionProp: 'expression value - component instance prop',
    })
  })
})
