import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { IElementService } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'

export const DeletePropMapBindingModal = observer<{
  elementService: IElementService
}>(({ elementService }) => {
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
      <ModalForm.Form
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
          Are you sure you want to delete the prop map binding "{pmb?.sourceKey}{' '}
          - {pmb?.targetKey}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
