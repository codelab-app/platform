import type { IEntity } from '@codelab/shared/abstract/types'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './show-field-on-dev'

export const idSchema: PropertiesSchema<IEntity> = {
  id: {
    type: 'string',
    ...showFieldOnDev(),
    disabled: true,
    required: ['id'],
  },
}

// TODO Enhance make entity schema typing
//  Remove unknown and make the typing work
//  org projects: platform/Dev/No Status

/**
 * The mapped type makes type checking fail for the whole schema
 */
const makeEntitySchema = <Key extends string>(
  entityName: Key,
): PropertiesSchema<{ [key in Key]: IEntity }> => {
  return {
    [entityName]: {
      properties: {
        id: {
          type: 'string',
        },
      },
      type: 'object',
      ...showFieldOnDev(),
      disabled: true,
      required: ['id'],
    },
  } as unknown as PropertiesSchema<{ [key in Key]: IEntity }>
}
