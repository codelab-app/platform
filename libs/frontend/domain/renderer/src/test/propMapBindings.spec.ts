import { elementRef, PropMapBinding } from '@codelab/frontend/domain/element'
import { IRenderOutput } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { LoopingRenderPipe } from '../renderPipes/loopingRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

describe('PropMapBindings', () => {
  const data = setupTestForRenderer([LoopingRenderPipe])

  it('should render prop map bindings targeting other elements', () => {
    const pmb = new PropMapBinding({
      id: v4(),
      sourceKey: 'parentProp',
      targetElement: elementRef(data.elementToRender02),
      targetKey: 'childProp',
    })

    data.elementToRender.addPropMapBinding(pmb)
    data.elementToRender.props?.set(pmb.sourceKey, 'parentPropValue')

    const { props, globalProps } = data.renderer.renderIntermediateElement(
      data.elementToRender,
    ) as IRenderOutput

    expect(props).toMatchObject({
      // control
      [pmb.sourceKey]: data.elementToRender.props?.get(pmb.sourceKey),
    })

    expect(globalProps).toMatchObject({
      [data.elementToRender02.id]: {
        [pmb.targetKey]: data.elementToRender.props?.get(pmb.sourceKey),
      },
    })
  })

  it('should render prop map bindings targeting this elements', () => {
    const pmb = new PropMapBinding({
      id: v4(),
      sourceKey: 'parentProp',
      targetElement: null,
      targetKey: 'parentProp2',
    })

    data.elementToRender.addPropMapBinding(pmb)
    data.elementToRender.props?.set(pmb.sourceKey, 'parentPropValue')

    const { props } = data.renderer.renderIntermediateElement(
      data.elementToRender,
    ) as IRenderOutput

    expect(props).toMatchObject({
      // control
      [pmb.sourceKey]: data.elementToRender.props?.get(pmb.sourceKey),
      [pmb.targetKey]: data.elementToRender.props?.get(pmb.sourceKey),
    })
  })
})
