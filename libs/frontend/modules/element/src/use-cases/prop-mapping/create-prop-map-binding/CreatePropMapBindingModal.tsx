import {
  SelectDescendantElement,
  SelectElementOption,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { AutoCompleteField, ModalForm } from '@codelab/frontend/view/components'
import { ICreatePropMapBindingDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithElementService } from '../../../store'
import { createPropMapBindingSchema } from './createPropMapBindingSchema'
import { TargetKeyField } from './TargetKeyField'

export interface CreatePropMapBindingModalProps extends WithElementService {
  providePropCompletion?: (searchValue: string) => Array<string>
}

interface CompletionValue {
  label: string
  value: string
}

export const CreatePropMapBindingModal = observer(
  ({
    elementService,
    providePropCompletion,
  }: CreatePropMapBindingModalProps) => {
    const closeModal = () => elementService.createPropMapBindingModal.close()
    const element = elementService.createPropMapBindingModal.element

    const [propCompleteOptions, setPropCompleteOptions] = useState<
      Array<CompletionValue>
    >(
      providePropCompletion
        ? providePropCompletion('').map((o) => ({ value: o, label: o }))
        : [],
    )

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
        childrenIds: e.childrenSorted.map((c) => c.id),
      }))

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create prop binding</span>}
        visible={elementService.createPropMapBindingModal.isOpen}
      >
        <ModalForm.Form<ICreatePropMapBindingDTO>
          model={{ elementId: element?.id }}
          onSubmit={(data) => {
            if (!element) {
              throw new Error(
                'CreatePropMapBindingModal: element is not defined in the modal state',
              )
            }

            return elementService.createPropMapBinding(element, data)
          }}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating prop binding',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createPropMapBindingSchema}
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

          <TargetKeyField name="targetKey" tree={elementService.elementTree} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
