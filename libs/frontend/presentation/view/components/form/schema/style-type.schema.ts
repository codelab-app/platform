import type { IApp } from '@codelab/frontend/abstract/core'
import { StyleType } from '@codelab/shared/abstract/codegen'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const styleTypeSchema: PropertiesSchema<Pick<IApp, 'styling'>> = {
  styling: {
    type: 'string',
    defaultValue: StyleType.MobileFirst,
    allowedValues: [StyleType.MobileFirst, StyleType.DesktopFirst],
    info: `This option has a dual impact: it both sets the default breakpoint and establishes the order of style precedence. 
To illustrate, when you opt for "Mobile First," it designates the mobile breakpoint as the default setting. 
Consequently, all larger breakpoints will inherit their styles from the mobile breakpoint`,
  },
}
