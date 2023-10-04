import type { IRenderOutput } from '@codelab/frontend/abstract/domain'
import { DATA_COMPONENT_ID, isAtomRef } from '@codelab/frontend/abstract/domain'
import { ComponentRenderPipe } from '../renderPipes/component-render-pipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('Renderer', () => {
  /**
   * Before all render pipes were built in to the renderer, now we extract and test only the ones we need
   */
  const data = setupTestForRenderer([ComponentRenderPipe])

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

    expect(props).toMatchObject({
      ...rootElementProps,
      ref: expect.any(Function),
    })

    const componentAtomType =
      rootElement && isAtomRef(rootElement.renderType)
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
      ref: expect.any(Function),
    })
  })
})
