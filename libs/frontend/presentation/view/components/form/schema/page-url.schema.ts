import type { IPage } from '@codelab/frontend/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { nonEmptyString } from './nonEmptyString'

export const pageUrlSchema: PropertiesSchema<Pick<IPage, 'url'>> = {
  url: {
    ...nonEmptyString,
    label: 'Deployed Page URL',
    default: '',
    help: 'Use / for "Home" page',
  },
}
