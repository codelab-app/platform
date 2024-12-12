'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

import {
  isAtom,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { SelectActionField } from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import {
  CodeMirrorField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { isDeepEqual } from 'remeda'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCustomCompareMemo } from 'use-custom-compare'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import ChildMapperCompositeField from '../../components/ChildMapperCompositeField'
import { RenderTypeField } from '../../components/render-type-field'
import { useElementService } from '../../services'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  runtimeElement: IRuntimeElementModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ runtimeElement }) => {
    const elementService = useElementService()

    const onSubmit = async (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const expandedFields: Array<string> = []
    const element = runtimeElement.element.current

    if (element.renderType.id) {
      expandedFields.push('renderer')
    }

    if (element.postRenderActions ?? element.preRenderActions) {
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
    const customOptions = createAutoCompleteOptions(runtimeProps.runtimeContext)

    const codeMirrorField = useCustomCompareMemo(
      CodeMirrorField,
      [customOptions],
      isDeepEqual,
    )

    const collapseItems = [
      {
        children: (
          <AutoField
            component={codeMirrorField}
            customOptions={customOptions}
            language={CodeMirrorLanguage.Javascript}
            name="renderIfExpression"
          />
        ),
        key: 'renderCondition',
        label: 'Render Condition',
      },
      {
        children: (
          <>
            <SelectActionField name="preRenderActions" />
            <SelectActionField name="postRenderActions" />
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
          uiKey={UiKey.ElementFormUpdate}
        >
          <AutoComputedElementNameField label="Name" name="name" />
          <RenderTypeField name="renderType" />
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
              'preRenderActions',
              'postRenderActions',
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
