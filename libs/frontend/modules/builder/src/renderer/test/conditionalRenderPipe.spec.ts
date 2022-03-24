import { ConditionalRenderPipe } from '../renderPipes/ConditionalRenderPipe'
import { setupTestRenderData } from './testData/renderData'

describe('ConditionalRenderPipe', () => {
  const data = setupTestRenderData(
    (next) => new ConditionalRenderPipe({ next }),
  )

  beforeEach(() => {
    data.elementToRender.setRenderIfPropKey('shouldRender')
  })

  it('should render normally if no key is found', async () => {
    data.elementToRender.setRenderIfPropKey(null)

    const output = data.renderService.renderElement(data.elementToRender, {
      shouldRender: false,
    })

    expect(output).toBeTruthy()
  })

  it('should stop rendering by returning null', async () => {
    const output = data.renderService.renderElement(data.elementToRender, {
      shouldRender: false,
    })

    expect(output).toBeNull()
  })

  it('should continue rendering', async () => {
    const initialProps = {
      shouldRender: true,
      prop01: 'prop01',
    }

    const output = data.renderService.renderElement(
      data.elementToRender,
      initialProps,
    )

    expect(output).toBeTruthy()
  })
})
