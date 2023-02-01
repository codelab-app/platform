import type {
  IActionService,
  IAtomService,
  IBuilderService,
  IComponentService,
  ICreateElementDTO,
  IElementService,
  IElementTree,
  IRenderService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { RenderTypeEnum } from '@codelab/frontend/abstract/core'
import {
  AutoComputedElementNameField,
  SelectAction,
  SelectAnyElement,
  SlugField,
} from '@codelab/frontend/domain/type'
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
  atomService: IAtomService
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
    componentService,
    atomService,
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

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement
    const [renderType, setRenderType] = useState<Nullable<RenderTypeEnum>>(null)
    const [componentId, setComponentId] = useState()
    const [atomId, setAtomId] = useState()
    const [name, setName] = useState('')

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
            atomId={atomId}
            atomService={atomService}
            componentId={componentId}
            componentService={componentService}
            label="Name"
            name="name"
          />
          <SlugField name="slug" srcString={name} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
