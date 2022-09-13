import {
  SelectAction,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IActionService,
  IBuilderService,
  IElement,
  IElementService,
  IUpdateBaseElementDTO,
  IUpdateElementDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateElementSchema } from './updateElementSchema'

export interface UpdateElementFormProps {
  element: IElement
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
  builderService: IBuilderService
  elementService: IElementService
  actionService: IActionService
  storeId: string
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({
    elementService,
    builderService,
    element,
    actionService,
    storeId,
    trackPromises,
    providePropCompletion,
  }) => {
    const { trackPromise } = trackPromises ?? {}

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<{ label: string; value: string }>
    >([])

    // Cache the initial element model, because when it updates it will interfere with what the user is typing
    const { current: model } = useRef({
      id: element.id,
      atomId: element.atom?.id,
      name: element.name,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
      renderComponentTypeId: element.renderComponentType?.id,
      postRenderActionId: element.postRenderActionId,
      preRenderActionId: element.preRenderActionId,
    })

    const onSubmit = (input: IUpdateElementDTO) => {
      const promise = elementService.update(element, input)

      if (trackPromise) {
        trackPromise(promise)
      }

      return promise
    }

    const handlePropSearch = (value: string) => {
      if (providePropCompletion) {
        setPropCompleteOptions(
          providePropCompletion(value).map((option) => ({
            value: option,
            label: option,
          })),
        )
      }
    }

    return (
      <Form<IUpdateBaseElementDTO>
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
        <AutoFields
          omitFields={[
            'atomId',
            'renderIfPropKey',
            'renderForEachPropKey',
            'propTransformationJs',
            'renderComponentTypeId',
            // We edit it in the css tab
            'customCss',
            'guiCss',
            'preRenderActionId',
            'postRenderActionId',
          ]}
        />
        <AutoField
          activeComponentId={builderService.activeComponent?.id}
          component={SelectComponent}
          name="renderComponentTypeId"
        />
        <AutoField component={SelectAtom} name="atomId" />
        <AutoCompleteField
          name="renderIfPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />

        <AutoCompleteField
          name="renderForEachPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
        <SelectAction
          actionService={actionService}
          name="preRenderActionId"
          storeId={storeId}
        />
        <SelectAction
          actionService={actionService}
          name="postRenderActionId"
          storeId={storeId}
        />
      </Form>
    )
  },
)
