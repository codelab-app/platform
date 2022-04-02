import { IHook, PropsData } from '@codelab/shared/abstract/core'
import { hookPipe } from './hookPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const testHookResponse: PropsData = {
  testHookResponse: {
    prop01: 'value01',
    prop02: 'value02',
  },
}

const getHooksResponse = (hooks: Array<IHook>, props: PropsData) =>
  testHookResponse

const defaultContext = { getHooksResponse } as RenderContext
const initialProps = {}

describe('HookPipe', () => {
  it('should hooks responses to props', () => {
    const { props } = hookPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual(testHookResponse)
  })
})
