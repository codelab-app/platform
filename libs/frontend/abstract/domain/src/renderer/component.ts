/**
 * This is our representation of what kind of ReactComponent to use
 */
import type { Nullable } from '@codelab/shared/abstract/types'
import type React from 'react'

export type IComponentType = {
  $$typeof?: symbol
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & (Nullable<string> | React.ComponentType<any>)
