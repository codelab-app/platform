import type {
  IElementModel,
  IUpdateBaseElementData,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { SelectActionField } from '@codelab/frontend/application/type'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
  Form,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { IElementRenderType } from '@codelab/shared/abstract/core'
import { Collapse } from 'antd'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import ChildMapperCompositeField from '../../../components/ChildMapperCompositeField'
import { RenderTypeCompositeField } from '../../../components/RenderTypeCompositeField'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  element: IElementModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ element }) => {
    const { elementService } = useStore()
    const modelSnapshot = getSnapshot(element)

    const renderType: IElementRenderType = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __typename:
        modelSnapshot.renderType.$modelType === '@codelab/AtomRef'
          ? 'Atom'
          : 'Component',
      id: modelSnapshot.renderType.id,
    }

    const model = { ...modelSnapshot, renderType }

    const onSubmit = async (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const expandedFields: Array<string> = []

    if (element.renderType.id) {
      expandedFields.push('renderer')
    }

    if (element.postRenderAction ?? element.preRenderAction) {
      expandedFields.push('actions')
    }

    if (element.renderIfExpression) {
      expandedFields.push('renderCondition')
    }

    if (
      element.childMapperPropKey ??
      element.childMapperPreviousSibling ??
      element.childMapperComponent
    ) {
      expandedFields.push('childMapper')
    }

    return (
      <Form<IUpdateBaseElementData>
        autosave
        key={element.id}
        model={element.toJson}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating element',
        })}
        schema={updateElementSchema}
      >
        <AutoComputedElementNameField label="Name" name="name" />
        <AutoFields
          omitFields={[
            'childMapperComponent',
            'childMapperPreviousSibling',
            'childMapperPropKey',
            'renderIfExpression',
            'renderForEachPropKey',
            // We edit it in the css tab
            'style',
            'tailwindClassNames',
            'preRenderAction',
            'postRenderAction',
            'renderType',
            'name',
          ]}
        />
        <Collapse defaultActiveKey={expandedFields}>
          <Collapse.Panel header="Renderer" key="renderer">
            <RenderTypeCompositeField name="renderType" />
          </Collapse.Panel>
          <Collapse.Panel header="Render Condition" key="renderCondition">
            <AutoField
              component={CodeMirrorField({
                customOptions: createAutoCompleteOptions(
                  element.expressionEvaluationContext,
                ),
                language: CodeMirrorLanguage.Javascript,
              })}
              name="renderIfExpression"
            />
          </Collapse.Panel>
          <Collapse.Panel header="Hooks Actions" key="actions">
            <SelectActionField name="preRenderAction" />
            <SelectActionField name="postRenderAction" />
          </Collapse.Panel>
          <Collapse.Panel header="Child Mapper" key="childMapper">
            <ChildMapperCompositeField element={element} />
          </Collapse.Panel>
        </Collapse>
      </Form>
    )
  },
)
