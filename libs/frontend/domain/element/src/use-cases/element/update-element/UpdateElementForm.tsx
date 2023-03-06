import type {
  IElement,
  IElementService,
  IRenderer,
  IUpdateBaseElementData,
  IUpdateElementData,
  RenderType,
} from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  DATA_ELEMENT_ID,
  IRenderTypeKind,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { SelectAction } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import {
  AutoCompleteField,
  CodeMirrorField,
  createAutoCompleteOptions,
  Form,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { updateElementSchema } from './updateElementSchema'

export interface UpdateElementFormProps {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  elementService: IElementService
  renderer?: IRenderer
}

const makeCurrentModel = (element: IElement) => {
  let renderType: RenderType | null = null

  if (isAtomInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IRenderTypeKind.Atom,
    }
  }

  if (isComponentInstance(element.renderType)) {
    renderType = {
      id: element.renderType.id,
      kind: IRenderTypeKind.Component,
    }
  }

  return {
    id: element.id,
    name: element.name,
    postRenderAction: element.postRenderAction,
    preRenderAction: element.preRenderAction,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
    renderType,
  }
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ elementService, element, trackPromises, renderer }) => {
    const { trackPromise } = trackPromises ?? {}
    const model = makeCurrentModel(element)

    const onSubmit = (data: IUpdateElementData) => {
      const promise = elementService.update(data)

      if (trackPromise) {
        trackPromise(promise)
      }

      return promise
    }

    const propsData = React.useMemo(() => {
      const renderOutput = renderer?.renderIntermediateElement(element)

      if (isNil(renderOutput)) {
        return {}
      }

      const props = Array.isArray(renderOutput)
        ? mergeProps(renderOutput.map((output) => output.props))
        : renderOutput.props

      const propsAndState = mergeProps(
        props,
        renderer?.appStore.current.state.values,
      )

      return omit(propsAndState, ['key', DATA_ELEMENT_ID, DATA_COMPONENT_ID])
    }, [element])

    return (
      <Form<IUpdateBaseElementData>
        autosave
        cssString={`
          & .ant-form-item-explain {
            display: none !important;
          }
        `}
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
          type: 'error',
        })}
        schema={updateElementSchema}
      >
        {element.id}
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
