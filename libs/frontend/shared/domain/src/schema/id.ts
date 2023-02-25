import { hideField, showFieldOnDev } from '@codelab/frontend/shared/utils'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const idSchema: PropertiesSchema<IEntity> = {
  id: {
    type: 'string',
    ...hideField,
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
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
      ...showFieldOnDev(),
      disabled: true,
      required: ['id'],
    },
  } as unknown as PropertiesSchema<{ [key in Key]: IEntity }>
}
