import { SelectAction } from '@codelab/frontend/modules/type'
import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  ICreateActionDTO,
} from '@codelab/shared/abstract/core'
import { hideField, showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

export const monacoTypescriptOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '100px' } },
}

export const monacoGraphQLOptions = {
  editorOptions: { language: MonacoLanguage.graphqlDev },
  containerProps: { style: { height: '100px' } },
}

export const monacoJSONOptions = {
  editorOptions: { language: MonacoLanguage.json },
  containerProps: { style: { height: '100px' } },
}

export const createActionSchema: JSONSchemaType<ICreateActionDTO> = {
  title: 'Create Action',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    storeId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    runOnInit: {
      type: 'boolean',
    },
    type: {
      type: 'string',
      enum: Object.values(IActionKind),
    },
    resourceId: {
      type: 'string',
      nullable: true,
      label: 'Resource',
    },
    successActionId: {
      type: 'string',
      nullable: true,
      label: 'Success Action',
    },
    errorActionId: {
      type: 'string',
      nullable: true,
      label: 'Error Action',
    },
    config: {
      type: 'object',
      label: '',
      nullable: true,
      properties: {
        query: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoGraphQLOptions) },
        },
        variables: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        body: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        urlSegment: {
          type: 'string',
          nullable: true,
        },
        method: {
          type: 'string',
          enum: keys(HttpMethod) as Array<HttpMethod>,
          showSearch: true,
        },
        queryParams: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        headers: {
          type: 'string',
          nullable: true,
          uniforms: { component: monacoFieldFactory(monacoJSONOptions) },
        },
        responseType: {
          type: 'string',
          enum: Object.values(HttpResponseType),
          showSearch: true,
        },
      },
      required: [],
    },
    code: {
      type: 'string',
      nullable: true,
      uniforms: { component: monacoFieldFactory(monacoTypescriptOptions) },
    },
    actionsIds: {
      type: 'array',
      label: 'Actions',
      items: {
        type: 'string',
        label: '',
        uniforms: { component: SelectAction },
        nullable: true,
      },
      nullable: true,
    },
  },
  required: ['name', 'type', 'storeId'],
} as const
