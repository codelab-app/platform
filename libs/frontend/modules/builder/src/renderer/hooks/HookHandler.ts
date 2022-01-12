import { PropsData } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'

export type HookHandler = (
  config: any,
  props?: PropsData,
) => Maybe<PropsData | void>
