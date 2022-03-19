import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { Form, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementStore } from '../../../store'
import { mapElementOption } from '../../../utils/elementOptions'
import { CreateElementInput, createElementSchema } from './createElementSchema'

export interface CreateElementModalProps {
  elementStore: ElementStore
}

export const CreateElementModal = observer(
  ({ elementStore }: CreateElementModalProps) => {
    const onSubmit = (submitData: CreateElementInput) =>
      elementStore.createElement(submitData)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementStore.createModal.parentElement

    const model = {
      parentElementId: parentElement?.id || undefined,
      order: parentElement ? parentElement.lastChildOrder + 1 : 1,
    }

    const closeModal = () => elementStore.createModal.close()

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create element</span>}
        visible={elementStore.createModal.isOpen}
      >
        <Form<CreateElementInput>
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
                allElementOptions={elementStore.elementTree.elementsList.map(
                  mapElementOption,
                )}
              />
            ))}
            name="parentElementId"
          />
          <AutoField name="order" />
          <AutoField component={SelectAtom} name="atomId" />
          <AutoField component={SelectComponent} name="instanceOfComponentId" />
        </Form>
      </ModalForm.Modal>
    )
  },
)
