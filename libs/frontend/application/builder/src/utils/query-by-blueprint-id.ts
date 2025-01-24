import type { Nullable } from '@codelab/shared/abstract/types'

import { getBlueprintId } from './get-blueprint-id'

export const queryByBlueprintId = (elementId: string): Nullable<HTMLElement> =>
  typeof document === 'undefined'
    ? null
    : document.querySelector(`#${getBlueprintId(elementId)}`)
