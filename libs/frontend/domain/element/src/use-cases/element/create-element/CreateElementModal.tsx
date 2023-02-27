import type {
  IActionService,
  IBuilderService,
  IComponentService,
  ICreateElementData,
  IElementService,
  IElementTree,
  IRenderService,
  IUserService,
  RenderTypeEnum,
} from '@codelab/frontend/abstract/core'
import { SelectAction, SelectAnyElement } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type {
  Nullable,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils'
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

export const CreateElementModal = observer<CreateElementModalProps>(
  ({
    elementService,
    builderService,
    userService,
    pageTree,
    renderService,
  }) => {
    const onSubmit = async (data: ICreateElementData) => {
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

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement

    const computeElementNameService =
      elementService.createModal.computeElementNameService!

    const [renderType, setRenderType] = useState<Nullable<RenderTypeEnum>>(null)

    if (!parentElement) {
      return null
    }

    const model = {
      parentElementId: parentElement.id,
      owner: userService.user?.auth0Id,
      // Needs to be null initially so that required sub-fields
      // are not validated when nothing is selected yet
      renderType: null,
    }

    const closeModal = () => elementService.createModal.close()

    const selectParentElementOptions =
      pageTree.elements.map(mapElementOption)

    const selectChildrenElementOptions =
      pageTree.elements.map(mapElementOption)

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        open={elementService.createModal.isOpen}
        title={<span css={tw`font-semibold`}>Create element</span>}
      >
        <ModalForm.Form<ICreateElementData>
          model={model}
          onChange={(key, value) => {
            key === 'renderType' && setRenderType(value.model)

            if (key === 'renderType.id' && renderType) {
              computeElementNameService.setPickedRenderType({
                model: renderType,
                id: value,
              })
            }
          }}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createElementSchema}
        >
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
            computeElementNameService={computeElementNameService}
            label="Name"
            name="name"
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
