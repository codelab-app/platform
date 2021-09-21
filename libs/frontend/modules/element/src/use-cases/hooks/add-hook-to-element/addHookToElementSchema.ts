import { HookType, QueryMethod } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { AddHookToElementMutationVariables } from './AddHookToElement.web.graphql.gen'

type AddHookToElementInput = AddHookToElementMutationVariables['input']
type QueryHookConfigInput = AddHookToElementInput['queryHook']
type GraphqlHookConfigInput = AddHookToElementInput['graphqlQueryHook']
type QueryPageHookConfigInput = AddHookToElementInput['queryPageHook']
type QueryPagesHookConfigInput = AddHookToElementInput['queryPagesHook']
type RecoilStateHookConfig = AddHookToElementInput['recoilStateHook']

export enum QueryHookVariant {
  Lambda = 'Lambda',
  Config = 'Config',
}

export type AddHookToElementSchema = {
  type: HookType
  queryHookVariant?: QueryHookVariant
  queryPageHook?: QueryPageHookConfigInput
  queryPagesHook?: QueryPagesHookConfigInput
  queryHook?: QueryHookConfigInput
  graphqlQueryHook?: GraphqlHookConfigInput
  graphqlMutationHook?: GraphqlHookConfigInput
  recoilStateHook?: RecoilStateHookConfig
}

export const addHookToElementSchema: JSONSchemaType<AddHookToElementSchema> = {
  title: 'Add hook to element input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: Object.values(HookType),
    },
    queryPagesHook: {
      type: 'object',
      nullable: true,
      properties: {
        appId: {
          type: 'string',
        },
      },
    },
    queryPageHook: {
      type: 'object',
      nullable: true,
      properties: {
        pageId: {
          type: 'string',
        },
      },
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
    graphqlQueryHook: {
      type: 'object',
      nullable: true,
      properties: {
        url: {
          type: 'string',
        },
        body: {
          type: 'string',
        },
        dataKey: {
          type: 'string',
        },
      },
      required: ['body', 'url'],
    },
    graphqlMutationHook: {
      type: 'object',
      nullable: true,
      properties: {
        url: {
          type: 'string',
        },
        body: {
          type: 'string',
        },
        dataKey: {
          type: 'string',
        },
      },
      required: ['body', 'url'],
    },
    recoilStateHook: {
      type: 'object',
      nullable: true,
      properties: {
        stateKey: {
          type: 'string',
        },
        defaultValue: {
          type: 'string',
        },
      },
      required: ['stateKey'],
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
    case HookType.GraphqlQuery:
      if (!data.graphqlQueryHook) {
        throw new Error('Graphql query hook data is required')
      }

      return {
        elementId,
        graphqlQueryHook: data.graphqlQueryHook,
      }
    case HookType.GraphqlMutation:
      if (!data.graphqlMutationHook) {
        throw new Error('Graphql mutation hook data is required')
      }

      return {
        elementId,
        graphqlMutationHook: data.graphqlMutationHook,
      }
    case HookType.RecoilState:
      if (!data.recoilStateHook) {
        throw new Error('Recoil state hook data is required')
      }

      return {
        elementId,
        recoilStateHook: data.recoilStateHook,
      }
    case HookType.QueryPage:
      return {
        elementId,
        queryPageHook: data.queryPageHook,
      }
    case HookType.QueryPages:
      return {
        elementId,
        queryPagesHook: data.queryPagesHook,
      }
  }

  throw new Error(`Unrecognized hook type ${data.type}`)
}
