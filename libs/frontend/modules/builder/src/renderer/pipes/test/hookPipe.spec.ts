import { IHook } from '@codelab/shared/abstract/core'
import { RenderProps } from '../../../store'
import { hookPipe } from '../hookPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const testHookResponse: RenderProps = {
  testHookResponse: {
    prop01: 'value01',
    prop02: 'value02',
  },
}

const getHooksResponse = (hooks: Array<IHook>, props: RenderProps) =>
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
