import { IElement, IHook } from '@codelab/shared/abstract/core'
import { RenderPipelineProps } from '../../../store'
import { hookPipe } from '../hookPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

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

const resultPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('HookPipe', () => {
  it('should hooks responses to props', () => {
    const restful = hookPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual(testHookResponse)
  })
})
