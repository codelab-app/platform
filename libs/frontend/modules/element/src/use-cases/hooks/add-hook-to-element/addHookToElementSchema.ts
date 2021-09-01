import { HookType, QueryMethod } from '@codelab/shared/enums'
import { JSONSchemaType } from 'ajv'
import { AddHookToElementMutationVariables } from './AddHookToElement.api.graphql'

type AddHookToElementInput = AddHookToElementMutationVariables['input']

type QueryHookConfigInput = AddHookToElementInput['queryHook']

export enum QueryHookVariant {
  Lambda = 'Lambda',
  Config = 'Config',
}

export type AddHookToElementSchema = {
  type: HookType
  queryHookVariant?: QueryHookVariant
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
    queryHookVariant: {
      type: 'string',
      enum: Object.values(QueryHookVariant),
      nullable: true,
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
          nullable: true,
        },
        url: {
          type: 'string',
          nullable: true,
        },
        lambdaId: {
          label: 'Lambda',
          type: 'string',
          nullable: true,
        },
      },
      required: ['queryKey'],
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
        throw new Error('Query hook data is required')
      }

      return {
        elementId,
        queryHook: data.queryHook,
      }
  }

  throw new Error(`Unrecognized hook type ${data.type}`)
}
