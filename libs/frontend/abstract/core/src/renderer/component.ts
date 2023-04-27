/**
 * This is our representation of what kind of ReactComponent to use
 */

import type { Nullable } from '@codelab/shared/abstract/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IComponentType = Nullable<string> | React.ComponentType<any>
