import { elementRef, PropMapBinding } from '@codelab/frontend/modules/element'
import { v4 } from 'uuid'
import { RenderOutput } from '../abstract/RenderOutput'
import { LoopingRenderPipe } from '../renderPipes/LoopingRenderPipe'
import { setupTestRenderData } from './testData/renderData'

describe('PropMapBindings', () => {
  const data = setupTestRenderData((next) => new LoopingRenderPipe({ next }))

  it('should render prop map bindings targeting other elements', () => {
    const pmb = new PropMapBinding({
      id: v4(),
      sourceKey: 'parentProp',
      targetElement: elementRef(data.elementToRender02),
      targetKey: 'childProp',
    })

    data.elementToRender.addPropMapBinding(pmb)
    data.elementToRender.props.set(pmb.sourceKey, 'parentPropValue')

    const { props, descendantPropBindings } = data.renderService.renderElement(
      data.elementToRender,
    ) as RenderOutput

    expect(props).toMatchObject({
      [pmb.sourceKey]: data.elementToRender.props.get(pmb.sourceKey), // control
    })

    expect(descendantPropBindings).toMatchObject({
      [data.elementToRender02.id]: {
        [pmb.targetKey]: data.elementToRender.props.get(pmb.sourceKey),
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
    data.elementToRender.props.set(pmb.sourceKey, 'parentPropValue')

    const { props } = data.renderService.renderElement(
      data.elementToRender,
    ) as RenderOutput

    expect(props).toMatchObject({
      [pmb.sourceKey]: data.elementToRender.props.get(pmb.sourceKey), // control
      [pmb.targetKey]: data.elementToRender.props.get(pmb.sourceKey),
    })
  })
})
