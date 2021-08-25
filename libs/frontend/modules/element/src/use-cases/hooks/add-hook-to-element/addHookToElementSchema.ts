import {
  AddHookToElementInput,
  HookType,
  QueryHookConfigInput,
  QueryMethod,
} from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type AddHookToElementSchema = {
  type: HookType
  queryHook?: QueryHookConfigInput
}

export const addHookToElementSchema: JSONSchemaType<AddHookToElementSchema> = {
  title: 'Add hook to element input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: Object.values(HookType),
    },
    queryHook: {
      type: 'object',
      nullable: true,
      properties: {
        queryKey: {
          type: 'string',
        },
        body: {
          type: 'string',
          nullable: true,
        },
        method: {
          type: 'string',
          enum: Object.values(QueryMethod),
        },
        url: {
          type: 'string',
        },
        dataPropKey: {
          type: 'string',
          nullable: true,
        },
        loadingPropKey: {
          type: 'string',
          nullable: true,
        },
        errorPropKey: {
          type: 'string',
          nullable: true,
        },
      },
      required: ['url', 'method', 'queryKey'],
    },
  },
  required: ['type'],
}

export const mapDataToInput = (
  elementId: string,
  data: AddHookToElementSchema,
): AddHookToElementInput => {
  switch (data.type) {
    case HookType.Query:
      if (!data.queryHook) {
        throw new Error('Query hook data is reuquired')
      }

      return {
        elementId,
        queryHook: data.queryHook,
      }
  }

  throw new Error(`Unrecognized hook type ${data.type}`)
}
