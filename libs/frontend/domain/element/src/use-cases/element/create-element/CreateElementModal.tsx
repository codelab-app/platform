import {
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
  SelectAction,
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
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

export const CreateElementModal = observer<CreateElementModalProps>(
  ({
    elementService,
    builderService,
    userService,
    pageTree,
    renderService,
    actionService,
    storeId,
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

    if (!parentElement) {
      return null
    }

    const model = {
      parentElementId: parentElement.id,
      owner: userService.user?.auth0Id,
    }

    const closeModal = () => elementService.createModal.close()

    const selectParentElementOptions = pageTree.elementsList
      .filter(
        (element) => !element.renderComponentType && !element.parentComponent,
      )
      .map(mapElementOption)

    const selectChildrenElementOptions =
      pageTree.elementsList.map(mapElementOption)

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create element</span>}
        visible={elementService.createModal.isOpen}
      >
        <ModalForm.Form<ICreateElementDTO>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createElementSchema}
        >
          <AutoFields
            omitFields={[
              'parentElementId',
              'atomId',
              'renderComponentTypeId',
              'customCss',
              'guiCss',
              'propsData',
              'prevSiblingId',
              'preRenderActionId',
              'postRenderActionId',
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
          <AutoField
            component={(props: UniformSelectFieldProps) => (
              <SelectAtom
                error={props.error}
                label={props.label}
                name={props.name}
                parent={parentElement.atom?.maybeCurrent}
              />
            )}
            name="atomId"
          />
          <AutoField
            activeComponentId={builderService.activeComponent?.id}
            component={SelectComponent}
            name="renderComponentTypeId"
          />
          <AutoField component={SelectAction} name="preRenderActionId" />
          <AutoField component={SelectAction} name="postRenderActionId" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
