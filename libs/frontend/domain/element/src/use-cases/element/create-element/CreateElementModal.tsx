import type {
  IActionService,
  IBuilderService,
  IComponentService,
  ICreateElementData,
  IElementService,
  IRenderService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { SelectAction, SelectAnyElement } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { mapElementOption } from '../../../utils'
import { createElementSchema } from './createElementSchema'

interface CreateElementModalProps {
  renderService: IRenderService
  actionService: IActionService
  builderService: IBuilderService
  elementService: IElementService
  userService: IUserService
  componentService: IComponentService
  storeId: string
}

export const CreateElementModal = observer<CreateElementModalProps>(
  ({ elementService, userService }) => {
    const { parentElement, elementTree } = elementService.createModal

    if (!parentElement || !elementTree) {
      return null
    }

    const onSubmit = async (data: ICreateElementData) => {
      const { prevSibling } = data

      const element = await (prevSibling
        ? elementService.createElementAsNextSibling(data)
        : elementService.createElementAsFirstChild(data))

      // Build tree for page
      elementTree.addElements([element])

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const closeModal = () => elementService.createModal.close()

    const model = {
      parentElementId: parentElement.id,
      owner: userService.user?.auth0Id,
      // Needs to be null initially so that required sub-fields
      // are not validated when nothing is selected yet
      renderType: null,
    }

    const selectParentElementOptions =
      elementTree.elementsList.map(mapElementOption)

    const selectChildrenElementOptions =
      elementTree.elementsList.map(mapElementOption)

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        open={elementService.createModal.isOpen}
        title={<span css={tw`font-semibold`}>Create element</span>}
      >
        <ModalForm.Form<ICreateElementData>
          model={model}
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
            help={`only elements from \`${elementTree.name}\` are visible in this list`}
            name="parentElementId"
          />
          <SelectLinkElement
            allElementOptions={selectChildrenElementOptions}
            name="prevSiblingId"
          />
          <RenderTypeCompositeField
            name="renderType"
            parent={parentElement.renderType?.maybeCurrent}
          />
          <AutoField component={SelectAction} name="preRenderActionId" />
          <AutoField component={SelectAction} name="postRenderActionId" />
          <Divider />
          <AutoComputedElementNameField label="Name" name="name" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
