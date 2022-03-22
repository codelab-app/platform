import { clone } from 'mobx-keystone'
import { RenderOutput } from '../RenderOutput'
import { ConditionalRenderPipe } from '../renderPipes/ConditionalRenderPipe'
import { PassThroughRenderPipe } from '../renderPipes/PassThroughRenderPipe'
import { elementToRender } from './testData/renderData'

describe('ConditionalRenderPipe', () => {
  const pipe = new ConditionalRenderPipe({
    next: new PassThroughRenderPipe({}),
  })

  const element = clone(elementToRender)
  element.setRenderIfPropKey('shouldRender')

  it('should stop rendering by returning null', async () => {
    const output = pipe.render(elementToRender, {
      shouldRender: false,
    })

    expect(output).toBeNull()
  })

  it('should continue rendering', async () => {
    const initialProps = {
      shouldRender: true,
      prop01: 'prop01',
    }

    const output = pipe.render(element, initialProps)
    console.log(output)

    expect((output as RenderOutput).props).toStrictEqual(initialProps)
  })
})
