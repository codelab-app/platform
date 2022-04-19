import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { RenderOutput } from '../abstract/RenderOutput'
import { setupTestRenderData } from './testData/renderData'

const extraProps = {
  extra1: '01',
  extra2: '02',
}

describe('RenderService', () => {
  const data = setupTestRenderData()

  it('should add extra props', () => {
    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    expect(props).toMatchObject(extraProps)
  })

  it('should apply transformation function', () => {
    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    expect(props).toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    data.elementToRender.setPropTransformationJs('invalid fn')

    const { props } = data.renderService.renderElementIntermediate(
      data.elementToRender,
      extraProps,
    ) as RenderOutput

    expect(props).not.toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should render component instance', () => {
    const { props, atomType, elementId } =
      data.renderService.renderElementIntermediate(
        data.componentInstanceElementToRender,
        {},
      ) as RenderOutput

    expect(props).toMatchObject({
      [DATA_COMPONENT_ID]: data.componentToRender.id,
      ...data.componentInstanceElementToRender.props?.propsData,
    })

    expect(atomType).toBe(data.componentRootElement.atom?.current.type)
    expect(elementId).toBe(data.componentRootElement.id)
  })
})
