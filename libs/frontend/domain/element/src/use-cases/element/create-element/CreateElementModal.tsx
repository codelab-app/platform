import type {
  IActionService,
  IBuilderService,
  IComponentService,
  ICreateElementDTO,
  IElementService,
  IElementTree,
  IRenderService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  AutoComputedElementNameField,
  SelectAction,
  SelectAnyElement,
  SelectAtomField,
  SelectComponent,
} from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type {
  Nullable,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import slugify from 'voca/slugify'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils/elementOptions'
import { createElementSchema } from './createElementSchema'

interface CreateElementModalProps {
  pageTree: IElementTree
  renderService: IRenderService
  actionService: IActionService
  builderService: IBuilderService
  elementService: IElementService
  userService: IUserService
  componentService: IComponentService
  storeId: string
}

/**
 * This component autofills the element name with the name of
 * the selected atom or component. additionally, it allows the
 * user to customize the name.
 */
export const CreateElementModal = observer<CreateElementModalProps>(
  ({
    elementService,
    builderService,
    userService,
    pageTree,
    renderService,
  }) => {
    const onSubmit = async (data: ICreateElementDTO) => {
      const { prevSiblingId } = data

      const element = await (prevSiblingId
        ? elementService.createElementAsNextSibling(data)
        : elementService.createElementAsFirstChild(data))

      // Build tree for page
      pageTree.addElements([element])

      // Get the component tree for the current element, so we can update the component tree
      const componentId = builderService.activeComponent?.id

      if (componentId) {
        const componentTree =
          renderService.renderers.get(componentId)?.pageTree?.current

        componentTree?.addElements([element])
      }

      return Promise.resolve([element]).finally(() => {
        setModel(null)
      })
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement

    const [model, setModel] =
      useState<Nullable<Partial<ICreateElementDTO & { owner: string }>>>(null)

    useEffect(() => {
      if (parentElement) {
        setModel({
          parentElementId: parentElement.id,
          owner: userService.user?.auth0Id,
          // Needs to be null initially so that required sub-fields
          // are not validated when nothing is selected yet
          renderType: null,
        })
      }
    }, [parentElement, userService.user?.auth0Id])

    if (!parentElement || !model) {
      return null
    }

    const closeModal = () => elementService.createModal.close()

    const selectParentElementOptions =
      pageTree.elementsList.map(mapElementOption)

    const selectChildrenElementOptions =
      pageTree.elementsList.map(mapElementOption)

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        open={elementService.createModal.isOpen}
        title={<span css={tw`font-semibold`}>Create element</span>}
      >
        <ModalForm.Form<ICreateElementDTO>
          model={model}
          onChange={(key, value) => {
            setModel({
              ...model,
              slug: key === 'name' ? slugify(value) : model.slug,
              [key]: value,
            })
          }}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createElementSchema}
        >
          <SelectAtomField name="atomId" />
          <AutoField component={SelectComponent} name="renderComponentTypeId" />
          <AutoFields
            omitFields={[
              'parentElementId',
              'customCss',
              'guiCss',
              'propsData',
              'prevSiblingId',
              'preRenderActionId',
              'postRenderActionId',
              'renderType',
              'name',
              'slug',
            ]}
          />
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <SelectAnyElement
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                allElementOptions={selectParentElementOptions}
              />
            )}
            name="parentElementId"
          />
          <SelectLinkElement
            allElementOptions={selectChildrenElementOptions}
            name="prevSiblingId"
          />
          <RenderTypeCompositeField
            name="renderType"
            parent={parentElement.atom?.maybeCurrent}
          />
          <AutoField component={SelectAction} name="preRenderActionId" />
          <AutoField component={SelectAction} name="postRenderActionId" />
          <Divider />
          <AutoComputedElementNameField
            atomId={model.atomId ?? undefined}
            componentId={model.renderComponentTypeId ?? undefined}
            label="Name"
            name="name"
          />
          <AutoField name="slug" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
