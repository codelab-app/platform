import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const pageUrlSchema: PropertiesSchema<Pick<IPageModel, 'urlPattern'>> = {
  urlPattern: {
    type: 'string',
    label: 'Deployed Page URL',
    help: 'Use / for "Home" page',
  },
}
