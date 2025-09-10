import type { IUpdateElementSchemaBuilder } from '@codelab/frontend-abstract-domain'

import {
  CodeMirrorField,
  ExpressionAutoCompleteField,
} from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
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
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeField } from '../../components/render-type-field'

export const updateElementSchema: IUpdateElementSchemaBuilder = ({
  actions,
  components,
  element,
  elements,
  renderIfAutoComplete,
}) => {
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

  const childMapperComponent = selectFieldSchema(
    'childMapperComponent',
    'Component',
    {
      options: components,
      extra: 'The component to render based on the length of the data source',
    },
  )

  const childMapperPreviousSibling = selectFieldSchema(
    'childMapperPreviousSibling',
    'Render next to',
    {
      options: elements,
      extra: 'Component instances will be rendered next to this element',
    },
  )

  return {
    properties: {
      ...idSchema,
      name: {
        autoFocus: true,
        ...nonEmptyString,
        ...titleCaseValidation,
        uniforms: { component: AutoComputedElementNameField },
      },
      tailwindClassNames: {
        nullable: true,
        type: 'array',
        items: {
          type: 'string',
        },
      },
      ...preRenderActions,
      ...postRenderActions,
      ...childMapperComponent,
      ...childMapperPreviousSibling,
      childMapperPropKey: {
        label: 'Prop Key',
        nullable: true,
        type: 'string',
        uniforms: { component: ExpressionAutoCompleteField },
        extra:
          'The key used to get the data from state e.g. `state.products`, `rootState.products`. Data source needs to be an array',
      },
      renderForEachPropKey: {
        label: 'Render for each',
        nullable: true,
        type: 'string',
      },
      renderIfExpression: {
        label: 'Render if',
        nullable: true,
        type: 'string',
        uniforms: {
          component: CodeMirrorField,
          language: CodeMirrorLanguage.Javascript,
          customOptions: renderIfAutoComplete,
        },
      },
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
        uniforms: {
          component: RenderTypeField,
          parentComponent: element.closestContainerComponent,
          parentElement: element.parentElement?.current,
        },
        required: ['id'],
        type: 'object',
      },
    },
    errors: {
      name: {
        required: requiredMsg('Element name'),
        minLength: minLengthMsg('Element name', 1),
        pattern: titleCasePatternMsg('Element name'),
      },
    },
    required: ['name', 'renderType'],
    title: 'Update Element Input',
    type: 'object',
  }
}
