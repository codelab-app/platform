'use client'

import type { ICreateElementSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { CodeMirrorField } from '@codelab/frontend-presentation-components-form'
import {
  hiddenField,
  idSchema,
  maybeRefSchema,
  multiSelectFieldSchema,
  nonEmptyString,
  selectFieldSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  minLengthMsg,
  requiredMsg,
  titleCasePatternMsg,
} from '@codelab/frontend-shared-utils'
import {
  ICodeMirrorLanguage,
  IElementRenderTypeKind,
} from '@codelab/shared-abstract-core'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeField } from '../../components/render-type-field'

export const createElementSchema: ICreateElementSchemaBuilder = ({
  actions,
  elements,
  selectedElement,
}) => {
  const parentElement = selectFieldSchema('parentElement', 'Parent element', {
    options: elements,
    extra: `only elements from \`${selectedElement.closestContainerNode.name}\` are visible in this list`,
  })

  const preRenderActions = multiSelectFieldSchema(
    'preRenderActions',
    'Pre Render action',
    {
      options: actions,
    },
  )

  const postRenderActions = multiSelectFieldSchema(
    'postRenderActions',
    'Post Render action',
    {
      options: actions,
    },
  )

  const propsApi = maybeRefSchema('api', 'API')

  return {
    properties: {
      ...idSchema,
      ...parentElement,
      renderType: {
        label: 'Render Type',
        properties: {
          id: {
            type: 'string',
          },
          __typename: {
            enum: [
              IElementRenderTypeKind.Component,
              IElementRenderTypeKind.Atom,
            ],
            type: 'string',
          },
        },
        required: ['id'],
        type: 'object',
        uniforms: {
          component: RenderTypeField,
          parentComponent: selectedElement.closestContainerComponent,
          parentElement: selectedElement,
        },
      },
      name: {
        ...nonEmptyString,
        ...titleCaseValidation,
        uniforms: {
          component: AutoComputedElementNameField,
        },
      },
      props: {
        label: '',
        properties: {
          ...idSchema,
          ...propsApi,
          data: {
            label: 'Props Data',
            type: 'string',
            uniforms: {
              component: CodeMirrorField,
              language: ICodeMirrorLanguage.Json,
            },
          },
        },
        type: 'object',
        required: ['id'],
      },
      style: {
        nullable: true,
        type: 'string',
        ...hiddenField,
      },
      tailwindClassNames: {
        nullable: true,
        type: 'array',
        items: {
          type: 'string',
        },
        ...hiddenField,
      },
      ...preRenderActions,
      ...postRenderActions,
    },
    errors: {
      name: {
        required: requiredMsg('Element name'),
        minLength: minLengthMsg('Element name', 1),
        pattern: titleCasePatternMsg('Element name'),
      },
    },
    required: ['name', 'id'],
    title: 'Create Element Input',
    type: 'object',
  } as const
}
