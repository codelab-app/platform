import type {
  IAtomService,
  IComponentService,
  IElement,
  IElementService,
  IUpdateBaseElementDTO,
  IUpdateElementDTO,
  RenderType,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import {
  AutoComputedElementNameField,
  SelectAction,
  SlugField,
} from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { AutoCompleteField, Form } from '@codelab/frontend/view/components'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { updateElementSchema } from './updateElementSchema'

export interface UpdateElementFormProps {
  element: IElement
  providePropCompletion?: (searchValue: string) => Array<string>
  trackPromises?: UseTrackLoadingPromises
  elementService: IElementService
  componentService: IComponentService
  atomService: IAtomService
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
  ({
    elementService,
    element,
    trackPromises,
    providePropCompletion,
    componentService,
    atomService,
  }) => {
    const { trackPromise } = trackPromises ?? {}

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<{ label: string; value: string }>
    >([])

    // Cache the initial element model, because when it updates it will interfere with what the user is typing
    const { current: model } = useRef(makeCurrentModel(element))

    // these are used to track changes in atom and comp id to update the name accordingly
    const [renderType, setRenderType] = useState<Maybe<RenderTypeEnum>>(
      model.renderType?.model,
    )

    const [componentId, setComponentId] = useState()
    const [atomId, setAtomId] = useState()
    const [name, setName] = useState(model.name || '')

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
          if (key === 'renderType') {
            setRenderType(value.model)
          }

          if (key === 'renderType.id') {
            renderType === RenderTypeEnum.Component && setComponentId(value)
            renderType === RenderTypeEnum.Atom && setAtomId(value)
          }

          if (key === 'name') {
            setName(value)
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
          atomId={atomId}
          atomService={atomService}
          componentId={componentId}
          componentService={componentService}
          label="Name"
          name="name"
        />
        <SlugField name="slug" srcString={name} />
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
