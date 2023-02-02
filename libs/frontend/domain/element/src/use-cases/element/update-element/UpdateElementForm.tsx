import type {
  IElement,
  IElementService,
  IUpdateBaseElementDTO,
  IUpdateElementDTO,
  RenderType,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import { SelectAction, SlugField } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { AutoCompleteField, Form } from '@codelab/frontend/view/components'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { updateElementSchema } from './updateElementSchema'

export interface UpdateElementFormProps {
  element: IElement
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
  elementService: IElementService
}

const makeCurrentModel = (element: IElement) => {
  let renderType: RenderType | null = null

  if (element.atom?.id) {
    renderType = {
      id: element.atom.id,
      model: RenderTypeEnum.Atom,
    }
  }

  if (element.renderComponentType?.id) {
    renderType = {
      id: element.renderComponentType.id,
      model: RenderTypeEnum.Component,
    }
  }

  return {
    id: element.id,
    name: element.name,
    slug: element.slug,
    renderForEachPropKey: element.renderForEachPropKey,
    renderIfExpression: element.renderIfExpression,
    postRenderActionId: element.postRenderActionId,
    preRenderActionId: element.preRenderActionId,
    renderType,
  }
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ elementService, element, trackPromises, providePropCompletion }) => {
    const { trackPromise } = trackPromises ?? {}

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<{ label: string; value: string }>
    >([])

    // Cache the initial element model, because when it updates it will interfere with what the user is typing
    const { current: model } = useRef(makeCurrentModel(element))

    const { current: computeElementNameService } = useRef(
      elementService.computeUpdatedElementNameService,
    )

    const [renderType, setRenderType] = useState<Maybe<RenderTypeEnum>>(
      model.renderType?.model,
    )

    const onSubmit = (data: IUpdateElementDTO) => {
      const promise = elementService.update(element, data)

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
        onChange={(key, value) => {
          key === 'renderType' && setRenderType(value?.model)

          if (key === 'renderType.id' && renderType) {
            computeElementNameService.setPickedRenderType({
              model: renderType,
              id: value,
            })
          }
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
          type: 'error',
        })}
        schema={updateElementSchema}
      >
        {element.id}
        <AutoComputedElementNameField
          computeElementNameService={computeElementNameService}
          defaultValue={model.name ?? undefined}
          label="Name"
          name="name"
        />
        <SlugField
          name="slug"
          srcString={computeElementNameService.computedName}
        />
        <AutoFields
          omitFields={[
            'renderIfExpression',
            'renderForEachPropKey',
            'propTransformationJs',
            // We edit it in the css tab
            'customCss',
            'guiCss',
            'preRenderActionId',
            'postRenderActionId',
            'renderType',
            'slug',
            'name',
          ]}
        />
        <RenderTypeCompositeField name="renderType" />
        <AutoCompleteField
          name="renderIfExpression"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />

        <AutoCompleteField
          name="renderForEachPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
        <AutoField component={SelectAction} name="preRenderActionId" />
        <AutoField component={SelectAction} name="postRenderActionId" />
      </Form>
    )
  },
)
