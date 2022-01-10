import { IElement, IHook } from '@codelab/shared/abstract/core'
import { RenderProps } from '../../../store'
import { hookPipe } from '../hookPipe'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'

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

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('HookPipe', () => {
  it('should hooks responses to props', () => {
    const restful = hookPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual(testHookResponse)
  })
})
