import type { IEntity } from '@codelab/shared/abstract/types'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './show-field-on-dev'

export const idSchema = ({
  component,
  label,
}: {
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>
} = {}): PropertiesSchema<IEntity> => ({
  id: {
    type: 'string',
    ...(label ? { label } : {}),
    ...showFieldOnDev(),
    disabled: true,
    required: ['id'],
    ...(component
      ? {
          uniforms: {
            component,
          },
        }
      : {}),
  },
  /**
   * Hide it, add only to implement IEntity
   */
  name: {
    type: 'string',
    nullable: true,
    uniforms: {
      component: () => null,
    },
  },
})

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
