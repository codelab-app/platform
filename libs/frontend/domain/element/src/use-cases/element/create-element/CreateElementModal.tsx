import type {
  ICreateElementData,
  IElementService,
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
import { v4 } from 'uuid'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { createElementSchema } from './create-element.schema'

interface CreateElementModalProps {
  elementService: IElementService
  storeId: string
  userService: IUserService
}

export const CreateElementModal = observer<CreateElementModalProps>(
  ({ elementService, userService }) => {
    const { elementTree, metadata, parentElement } = elementService.createModal
    const elementOptions = metadata?.elementOptions

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
      id: v4(),
      owner: userService.user?.auth0Id,
      parentElement: {
        id: parentElement.id,
      },
      // Needs to be null initially so that required sub-fields
      // are not validated when nothing is selected yet
      renderType: null,
    }

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
              'parentElement',
              'customCss',
              'guiCss',
              'propsData',
              'prevSibling',
              'preRenderAction',
              'postRenderAction',
              'renderType',
              'name',
            ]}
          />
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <SelectAnyElement
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                allElementOptions={elementOptions}
              />
            )}
            help={`only elements from \`${elementTree.name}\` are visible in this list`}
            name="parentElement.id"
          />
          <SelectLinkElement
            allElementOptions={elementOptions}
            name="prevSibling.id"
            required={false}
          />
          <RenderTypeCompositeField
            name="renderType"
            parent={parentElement.renderType?.maybeCurrent}
          />
          <AutoField
            component={SelectAction}
            name="preRenderAction.id"
            required={false}
          />
          <AutoField
            component={SelectAction}
            name="postRenderAction.id"
            required={false}
          />
          <Divider />
          <AutoComputedElementNameField label="Name" name="name" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
