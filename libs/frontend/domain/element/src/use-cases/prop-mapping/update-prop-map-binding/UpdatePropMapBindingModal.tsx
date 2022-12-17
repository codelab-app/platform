import type {
  IElementService,
  IElementTree,
  IUpdatePropMapBindingDTO,
} from '@codelab/frontend/abstract/core'
import type { SelectElementOption } from '@codelab/frontend/domain/type'
import { SelectDescendantElement } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { AutoCompleteField, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TargetKeyField } from '../create-prop-map-binding/TargetKeyField'
import { updatePropMapBindingSchema } from './updatePropMapBindingSchema'

export interface UpdatePropMapBindingModalProps {
  providePropCompletion?: (searchValue: string) => Array<string>
  elementService: IElementService
  elementTree: IElementTree
}

export const UpdatePropMapBindingModal =
  observer<UpdatePropMapBindingModalProps>(
    ({ providePropCompletion, elementService, elementTree }) => {
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
        elementTree.elementsList.map((e) => ({
          value: e.id,
          label: e.label,
          childrenIds: e.children.map((c) => c.id),
        }))

      return (
        <ModalForm.Modal
          okText="Update"
          onCancel={closeModal}
          open={elementService.updatePropMapBindingModal.isOpen}
          title={<span css={tw`font-semibold`}>Update prop binding</span>}
        >
          <ModalForm.Form<IUpdatePropMapBindingDTO>
            model={{
              sourceKey: pmb?.sourceKey,
              targetKey: pmb?.targetKey,
              targetElementId: pmb?.targetElementId,
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
              element={elementService.element.bind(elementService)}
              name="targetKey"
            />
          </ModalForm.Form>
        </ModalForm.Modal>
      )
    },
  )
