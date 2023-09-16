import type { IPageModel } from '@codelab/frontend/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { nonEmptyString } from './non-empty-string'

export const pageUrlSchema: PropertiesSchema<Pick<IPageModel, 'url'>> = {
  url: {
    ...nonEmptyString,
    label: 'Deployed Page URL',
    default: '',
    help: 'Use / for "Home" page',
  },
}
