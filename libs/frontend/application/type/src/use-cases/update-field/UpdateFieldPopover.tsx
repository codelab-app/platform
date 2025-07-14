'use client'

import type { IFieldUpdateRoute } from '@codelab/frontend-abstract-application'
import type { IFieldModel } from '@codelab/frontend-abstract-domain'
import type { IFieldUpdateData } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { FieldFormStep } from '@codelab/shared-abstract-core'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { useFieldService } from '../../services/field.service'
import { FieldDefaultValueForm } from '../create-field/FieldDefaultValueForm'
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldPopover = ({
  context,
  field,
}: {
  field: IFieldModel
  context: IFieldUpdateRoute
}) => {
  const fieldService = useFieldService()
  const router = useRouter()

  const [formStep, setFormStep] = useState<FieldFormStep>(
    FieldFormStep.UpdateFieldFormStep,
  )

  const [formState, setFormState] = useState<IFieldUpdateData>()
  const updateFieldFormSubmitRef = useRef<Maybe<SubmitController>>(undefined)
  const defaultValueFormSubmitRef = useRef<Maybe<SubmitController>>(undefined)
  const { updatePopover } = useFieldService()
  const closePopover = () => updatePopover.close(router, context)

  const updateFieldFormToolbar =
    formStep === FieldFormStep.UpdateFieldFormStep
      ? [
          {
            cuiKey: UiKey.FieldToolbarItemUpdateNext,
            icon: <SaveOutlined />,
            label: 'Next',
            onClick: () => updateFieldFormSubmitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.FieldToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: closePopover,
          },
        ]
      : []

  const defaultValueFormToolbar =
    formStep === FieldFormStep.DefaultValueFormStep
      ? [
          {
            cuiKey: UiKey.FieldFormUpdate,
            icon: <SaveOutlined />,
            label: 'Update Field',
            onClick: () => defaultValueFormSubmitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.FieldToolbarItemUpdateBack,
            icon: <CloseOutlined />,
            label: 'Back',
            onClick: () => setFormStep(FieldFormStep.UpdateFieldFormStep),
          },
        ]
      : []

  return (
    <CuiSidebarSecondary
      id={UiKey.FieldPopoverUpdate}
      toolbar={{
        items:
          formStep === FieldFormStep.UpdateFieldFormStep
            ? updateFieldFormToolbar
            : defaultValueFormToolbar,
        title: 'Update Field toolbar',
      }}
    >
      <UpdateFieldForm
        disabled={formStep === FieldFormStep.DefaultValueFormStep}
        field={field}
        onSubmit={(data) => {
          setFormState(data)
          setFormStep(FieldFormStep.DefaultValueFormStep)
        }}
        onSubmitSuccess={() => null}
        submitRef={updateFieldFormSubmitRef}
      />
      {formStep === FieldFormStep.DefaultValueFormStep && formState && (
        <FieldDefaultValueForm
          fieldType={formState.fieldType}
          onSubmit={async (data) => {
            await fieldService.update({
              ...formState,
              defaultValues: data.defaultValues,
            })
            closePopover()
          }}
          submitRef={defaultValueFormSubmitRef}
          validationRules={formState.validationRules}
        />
      )}
    </CuiSidebarSecondary>
  )
}
