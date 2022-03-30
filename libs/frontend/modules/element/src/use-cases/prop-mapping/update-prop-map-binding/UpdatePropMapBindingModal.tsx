import {
  SelectDescendantElement,
  SelectElementOption,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { AutoCompleteField, ModalForm } from '@codelab/frontend/view/components'
import { UpdatePropMapBindingData } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithElementService } from '../../../store'
import { TargetKeyField } from '../create-prop-map-binding/TargetKeyField'
import { updatePropMapBindingSchema } from './updatePropMapBindingSchema'

export interface UpdatePropMapBindingModalProps extends WithElementService {
  providePropCompletion?: (searchValue: string) => Array<string>
}

export const UpdatePropMapBindingModal =
  observer<UpdatePropMapBindingModalProps>(
    ({ providePropCompletion, elementService }) => {
      const [propCompleteOptions, setPropCompleteOptions] = useState<
        Array<{ label: string; value: string }>
      >([])

      const closeModal = () => elementService.updatePropMapBindingModal.close()
      const pmb = elementService.updatePropMapBindingModal.propMapBinding
      const element = elementService.updatePropMapBindingModal.element

      const handlePropSearch = (value: string) => {
        if (providePropCompletion) {
          setPropCompleteOptions(
            providePropCompletion(value).map((option) => ({
              value: option,
              label: option,
            })),
          )
        }
      }

      const allElementOptions: Array<SelectElementOption> =
        elementService.elementTree.elementsList.map((e) => ({
          value: e.id,
          label: e.label,
          childrenIds: e.childrenList.map((c) => c.id),
        }))

      return (
        <ModalForm.Modal
          okText="Update"
          onCancel={closeModal}
          title={<span css={tw`font-semibold`}>Update prop binding</span>}
          visible={elementService.updatePropMapBindingModal.isOpen}
        >
          <ModalForm.Form<UpdatePropMapBindingData>
            model={{
              sourceKey: pmb?.sourceKey,
              targetKey: pmb?.targetKey,
              targetElementId: pmb?.targetElement?.id,
            }}
            onSubmit={(data) => {
              if (!pmb || !element) {
                throw new Error('pmb or element is null')
              }

              return elementService.updatePropMapBinding(element, pmb, data)
            }}
            onSubmitError={createNotificationHandler({
              title: 'Error while updating prop binding',
              type: 'error',
            })}
            onSubmitSuccess={closeModal}
            schema={updatePropMapBindingSchema}
          >
            <AutoFields
              omitFields={['sourceKey', 'targetElementId', 'targetKey']}
            />
            <AutoCompleteField
              name="sourceKey"
              onSearch={handlePropSearch}
              options={propCompleteOptions}
            />
            <AutoField
              allElementOptions={allElementOptions}
              component={SelectDescendantElement}
              name="targetElementId"
              targetElementId={element?.id}
            />
            <TargetKeyField
              name="targetKey"
              tree={elementService.elementTree}
            />
          </ModalForm.Form>
        </ModalForm.Modal>
      )
    },
  )
