import { IHook } from '@codelab/shared/abstract/core'
import { RenderPipelineProps } from '../../../store'
import { hookPipe } from '../hookPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const testHookResponse: RenderPipelineProps = {
  testHookResponse: {
    prop01: 'value01',
    prop02: 'value02',
  },
}

const getHooksResponse = (hooks: Array<IHook>, props: RenderPipelineProps) =>
  testHookResponse

const defaultContext = { getHooksResponse } as RenderContext
const initialProps = {}

describe('HookPipe', () => {
  it('should hooks responses to props', () => {
    const { props } = hookPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual(testHookResponse)
  })
})
