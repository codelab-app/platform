import {
  COMPONENT_SERVICE,
  ELEMENT_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateElementDTO, IElementTree } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { mapElementOption } from '../../../utils/elementOptions'
import { createElementSchema } from './createElementSchema'

type CreateElementModalProps = {
  elementTree: IElementTree
} & WithServices<ELEMENT_SERVICE | USER_SERVICE | COMPONENT_SERVICE>

export const CreateElementModal = observer<CreateElementModalProps>(
  ({ elementService, userService, elementTree, componentService }) => {
    const onSubmit = async (data: ICreateElementDTO) => {
      const [element] = await elementService.create([data])

      // Build tree for page
      elementTree.buildTree([element])

      // Get the component tree for the current element
      const componentId = element?.instanceOfComponent?.id

      if (componentId) {
        console.log(componentId)

        const componentTree = componentService.elementTrees.get(componentId)
        console.log(componentTree)
        componentTree?.buildTree([element])
      }

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement

    const model = {
      parentElementId: parentElement?.id || undefined,
      order: parentElement ? parentElement?.lastChildOrder + 1 : 1,
      owner: userService.user?.auth0Id,
    }

    const closeModal = () => elementService.createModal.close()

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
              'instanceOfComponentId',
              'order',
              'css',
              'propsData',
            ]}
          />
          <AutoField
            component={observer((props) => (
              <SelectAnyElement
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...(props as any)}
                allElementOptions={elementTree.elementsList
                  .filter(
                    (element) =>
                      !element?.instanceOfComponent && !element?.component,
                  )
                  .map(mapElementOption)}
              />
            ))}
            name="parentElementId"
          />
          <AutoField name="order" />
          <AutoField component={SelectAtom} name="atomId" />
          <AutoField component={SelectComponent} name="instanceOfComponentId" />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
