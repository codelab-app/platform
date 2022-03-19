import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  Form,
  ModalForm,
} from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { DeletePropMapBindingForm, ElementId } from './DeletePropMapBindingForm'
import { useDeletePropMapBindingForm } from './useDeletePropMapBindingForm'

export type DeletePropMapBindingModalProps = WithElementService

export const DeletePropMapBindingModal =
  observer<DeletePropMapBindingModalProps>(({ elementService }) => {
    const element = elementService.deletePropMapBindingModal.element
    const pmb = elementService.deletePropMapBindingModal.propMapBinding
    const closeModal = () => elementService.deletePropMapBindingModal.close()

    return (
      <ModalForm.Modal
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete prop binding</span>}
        visible={elementService.deletePropMapBindingModal.isOpen}
      >
        <Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={() => {
            if (!element || !pmb) {
              throw new Error(
                'DeletePropMapBindingModal: element or pmb is undefined',
              )
            }

            return elementService.deletePropMapBinding(element, pmb)
          }}
          onSubmitError={createNotificationHandler({
            title: 'Error while deleting prop map binding',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete the prop map binding "
            {pmb?.sourceKey} - {pmb?.targetKey}"?
          </h4>
          <AutoFields />
        </Form>
      </ModalForm.Modal>
    )
  })
