import { UseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementModel, ElementService } from '../../../store'
import { UpdateElementInput, updateElementSchema } from './updateElementSchema'

export type UpdateElementFormProps = Omit<
  UseCaseFormWithRef<UpdateElementInput>,
  'onSubmit'
> & {
  elementService: ElementService
  element: ElementModel
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer(
  ({
    elementService,
    element,
    trackPromises,
    providePropCompletion,
  }: UpdateElementFormProps) => {
    const { trackPromise } = trackPromises ?? {}

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<{ label: string; value: string }>
    >([])

    const { current: model } = useRef({
      atomId: element.atom?.id,
      name: element.name,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
    }) // Cache the initial element model, because when it updates it will interfere with what the user is typing

    const onSubmit = (input: UpdateElementInput) => {
      const promise = elementService.updateElement(element, input)

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
      <div>
        <Form<UpdateElementInput>
          autosave
          key={element.id}
          model={model}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while updating element',
            type: 'error',
          })}
          schema={updateElementSchema}
          submitRef={undefined}
        >
          <AutoFields
            omitFields={[
              'atomId',
              'renderIfPropKey',
              'renderForEachPropKey',
              'propTransformationJs',
              'instanceOfComponentId',
              'css', // We edit it in the css tab
            ]}
          />
          <AutoField component={SelectComponent} name="instanceOfComponentId" />
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
        </Form>
      </div>
    )
  },
)
