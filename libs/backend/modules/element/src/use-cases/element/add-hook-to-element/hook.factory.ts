import { Hook } from '@codelab/backend/modules/hook'
import { HookType } from '@codelab/shared/abstract/core'
import { AddHookToElementInput } from './add-hook-to-element.input'

export const hookFactory = ({ queryHook }: AddHookToElementInput) => {
  if (queryHook) {
    return new Hook({ type: HookType.Query, config: queryHook })
  }

  throw new Error('Invalid AddHookToElementInput')
}
