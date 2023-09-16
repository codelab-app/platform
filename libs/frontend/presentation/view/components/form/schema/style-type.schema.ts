import type { IApp } from '@codelab/frontend/abstract/core'
import { StyleType } from '@codelab/shared/abstract/codegen'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const styleTypeSchema: PropertiesSchema<Pick<IApp, 'styling'>> = {
  styling: {
    type: 'string',
    defaultValue: StyleType.MobileFirst,
    allowedValues: [StyleType.MobileFirst, StyleType.DesktopFirst],
    // nullable: true,
  },
}
