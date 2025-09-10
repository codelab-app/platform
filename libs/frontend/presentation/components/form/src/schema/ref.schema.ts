import type { IRef } from '@codelab/shared-abstract-core'
import type { Nullish } from '@codelab/shared-abstract-types'
import type { JSONSchemaType } from 'ajv/dist/types/json-schema'

import { mergeDeep } from 'remeda'

import { idSchema } from './id.schema'

/**
 * This is used to allow user to assign reference
 */
export const refSchema = (key: string, label: string) =>
  ({
    [key]: {
      type: 'object',
      properties: idSchema,
      required: ['id'],
      label,
    },
  } as JSONSchemaType<IRef>['properties'])

export const maybeRefSchema = (key: string, label: string) =>
  mergeDeep(refSchema(key, label), {
    [key]: { nullable: true },
  }) as JSONSchemaType<Nullish<IRef>>['properties']
