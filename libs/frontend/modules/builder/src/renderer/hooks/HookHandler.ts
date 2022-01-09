import { Maybe } from '@codelab/shared/abstract/types'

export type HookHandler = (
  config: any,
  props?: Record<string, any>,
) => Maybe<Record<string, any> | void>
