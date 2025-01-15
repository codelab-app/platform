'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'

import {
  isAtom,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { logger, tracker } from '@codelab/frontend/infra/logger'
import {
  SelectActionsField,
  SelectComponent,
} from '@codelab/frontend/presentation/components/interface-form'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import {
  CodeMirrorField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import { Collapse, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import { isDeepEqual } from 'remeda'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCustomCompareMemo } from 'use-custom-compare'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import ChildMapperField from '../../components/child-mapper-field/ChildMapperField'
import { RenderTypeField } from '../../components/render-type-field'
import { useElementService } from '../../services'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  runtimeElement: IRuntimeElementModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer(
  ({ runtimeElement }: UpdateElementFormProps) => {
    tracker.useModelDiff('UpdateElementForm', runtimeElement)
    tracker.useRenderedCount('UpdateElementForm')

    const elementService = useElementService()

    const onSubmit = async (data: IUpdateElementData) => {
      console.log('Submit data', data)
      logger.debug('Submit data', {
        data: {
          childMapperComponent: data.childMapperComponent,
        },
      })

      return elementService.update(data)
      // return Promise.resolve()
    }

    const expandedFields: Array<string> = []
    // `getSnapshot` is immutable and doesn't work
    const element = runtimeElement.element.current

    console.log('element', element, element.renderType)

    if (element.renderType.id) {
      expandedFields.push('renderer')
    }

    if (element.postRenderActions?.length || element.preRenderActions?.length) {
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
            <SelectActionsField name="preRenderActions" />
            <SelectActionsField name="postRenderActions" />
          </>
        ),
        key: 'actions',
        label: 'Hooks Actions',
      },
    ]

    if (isAtom(element.renderType.current)) {
      collapseItems.push({
        children: <ChildMapperField runtimeElement={runtimeElement} />,
        key: 'childMapper',
        label: 'Child Mapper',
      })
    }

    return (
      <div key={element.id}>
        <Form<IUpdateBaseElementData>
          autosave
          errorMessage="Error while updating element"
          model={element.toJson}
          onSubmit={onSubmit}
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
          {/* <SelectComponent
            component={childMapperComponent}
            label="Component"
            name="childMapperComponent.id"
          /> */}
          <Collapse defaultActiveKey={expandedFields} items={collapseItems} />
        </Form>
      </div>
    )
  },
)
