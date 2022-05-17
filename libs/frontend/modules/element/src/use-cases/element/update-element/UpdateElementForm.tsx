import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IElement,
  IUpdateBaseElementDTO,
  IUpdateElementDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateElementSchema } from './updateElementSchema'

export type UpdateElementFormProps = WithServices<ELEMENT_SERVICE> & {
  element: IElement
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ elementService, element, trackPromises, providePropCompletion }) => {
    const { trackPromise } = trackPromises ?? {}

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<{ label: string; value: string }>
    >([])

    // Cache the initial element model, because when it updates it will interfere with what the user is typing
    const { current: model } = useRef({
      atomId: element.atom?.id,
      name: element.name,
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
      instanceOfComponentId: element.instanceOfComponent?.id,
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
        <AutoFields
          omitFields={[
            'atomId',
            'renderIfPropKey',
            'renderForEachPropKey',
            'propTransformationJs',
            'instanceOfComponentId',
            // We edit it in the css tab
            'css',
          ]}
        />
        <AutoField component={SelectComponent} name="instanceOfComponentId" />
        <AutoField component={SelectAtom} name="atomId" />
        {/* <AutoCompleteField */}
        {/*  name="renderIfPropKey" */}
        {/*  onSearch={handlePropSearch} */}
        {/*  options={propCompleteOptions} */}
        {/*/ > */}
        {/* <AutoCompleteField */}
        {/*  name="renderForEachPropKey" */}
        {/*  onSearch={handlePropSearch} */}
        {/*  options={propCompleteOptions} */}
        {/*/ > */}
      </Form>
    )
  },
)
