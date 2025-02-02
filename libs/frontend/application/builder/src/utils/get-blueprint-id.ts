import { BLUEPRINT_ID_PREFIX } from '@codelab/frontend/abstract/domain'

export const getBlueprintId = (elementId: string) =>
  `${BLUEPRINT_ID_PREFIX}${elementId}`
