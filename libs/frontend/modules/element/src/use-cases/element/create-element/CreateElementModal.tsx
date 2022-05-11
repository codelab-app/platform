import {
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
import { ICreateElementDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { mapElementOption } from '../../../utils/elementOptions'
import { createElementSchema } from './createElementSchema'

export const CreateElementModal = observer<
  WithServices<ELEMENT_SERVICE | USER_SERVICE>
>(({ elementService, userService }) => {
  const onSubmit = (data: ICreateElementDTO) => elementService.create([data])

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
              allElementOptions={elementService.elementTree.elementsList
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
})
