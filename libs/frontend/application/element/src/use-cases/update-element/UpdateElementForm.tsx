import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import {
  isAtom,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import { SelectActionField } from '@codelab/frontend-application-type/interface-form'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import {
  CodeMirrorField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import ChildMapperCompositeField from '../../components/ChildMapperCompositeField'
import { RenderTypeCompositeField } from '../../components/RenderTypeCompositeField'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  runtimeElement: IRuntimeElementModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ runtimeElement }) => {
    const { elementService } = useStore()

    const onSubmit = async (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const expandedFields: Array<string> = []
    const element = runtimeElement.element.current

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
      isAtom(element.renderType.current) &&
      (element.childMapperPropKey ??
        element.childMapperPreviousSibling ??
        element.childMapperComponent)
    ) {
      expandedFields.push('childMapper')
    }

    const runtimeProps = runtimeElement.runtimeProps

    const collapseItems = [
      {
        children: <RenderTypeCompositeField name="renderType" />,
        key: 'renderer',
        label: 'Renderer',
      },
      {
        children: (
          <AutoField
            component={CodeMirrorField({
              customOptions: createAutoCompleteOptions(
                runtimeProps.runtimeContext,
              ),
              language: CodeMirrorLanguage.Javascript,
            })}
            name="renderIfExpression"
          />
        ),
        key: 'renderCondition',
        label: 'Render Condition',
      },
      {
        children: (
          <>
            <SelectActionField name="preRenderAction" />
            <SelectActionField name="postRenderAction" />
          </>
        ),
        key: 'actions',
        label: 'Hooks Actions',
      },
    ]

    if (isAtom(element.renderType.current)) {
      collapseItems.push({
        children: <ChildMapperCompositeField runtimeElement={runtimeElement} />,
        key: 'childMapper',
        label: 'Child Mapper',
      })
    }

    return (
      <div key={element.id}>
        <Form<IUpdateBaseElementData>
          autosave
          model={element.toJson}
          onSubmit={onSubmit}
          onSubmitError={createFormErrorNotificationHandler({
            title: 'Error while updating element',
          })}
          schema={updateElementSchema}
          uiKey={MODEL_ACTION.UpdateElement.key}
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
          <Collapse defaultActiveKey={expandedFields} items={collapseItems} />
        </Form>
      </div>
    )
  },
)
