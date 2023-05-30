import type {
  IElement,
  IUpdateBaseElementData,
  IUpdateElementData,
} from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import { SelectAction } from '@codelab/frontend/domain/type'
import {
  useCurrentPage,
  useStore,
} from '@codelab/frontend/presentation/container'
import {
  AutoCompleteField,
  CodeMirrorField,
  createAutoCompleteOptions,
  Form,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { getElementModel } from '../../../utils/get-element-model'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  element: IElement
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ element }) => {
    const { elementService, renderService } = useStore()
    const { page } = useCurrentPage()
    const renderer = page && renderService.renderers.get(page.id)
    const model = getElementModel(element)

    const onSubmit = (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const propsData = React.useMemo(() => {
      const renderOutput = renderer?.renderIntermediateElement(element)

      if (isNil(renderOutput)) {
        return {}
      }

      const props = Array.isArray(renderOutput)
        ? mergeProps(renderOutput.map((output) => output.props))
        : renderOutput.props

      const propsAndState = mergeProps(props, element.store.current.state)

      return omit(propsAndState, ['key', DATA_ELEMENT_ID, DATA_COMPONENT_ID])
    }, [element])

    return (
      <Form<IUpdateBaseElementData>
        autosave
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
          type: 'error',
        })}
        schema={updateElementSchema}
      >
        <AutoComputedElementNameField label="Name" name="name" />
        <AutoFields
          omitFields={[
            'renderIfExpression',
            'renderForEachPropKey',
            'propTransformationJs',
            // We edit it in the css tab
            'customCss',
            'guiCss',
            'preRenderAction',
            'postRenderAction',
            'renderType',
            'name',
          ]}
        />
        <RenderTypeCompositeField name="renderType" />
        <AutoField
          component={CodeMirrorField({
            customOptions: createAutoCompleteOptions(propsData, 'this'),
            language: CodeMirrorLanguage.Javascript,
          })}
          name="renderIfExpression"
        />
        <AutoCompleteField
          filterOption
          name="renderForEachPropKey"
          options={Object.keys(propsData)
            .sort()
            .map((label) => ({ label, value: label }))}
        />
        <AutoField component={SelectAction} name="preRenderAction.id" />
        <AutoField component={SelectAction} name="postRenderAction.id" />
      </Form>
    )
  },
)
