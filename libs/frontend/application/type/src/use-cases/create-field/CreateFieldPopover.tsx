'use client'

import type { IFieldCreateRoute } from '@codelab/frontend-abstract-application'
import type { IFieldCreateData } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { FieldFormStep } from '@codelab/shared-abstract-core'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { useFieldService } from '../../services/field.service'
import { CreateFieldForm } from './CreateFieldForm'
import { FieldDefaultValueForm } from './FieldDefaultValueForm'

interface CreateFieldPopoverProps {
  context: IFieldCreateRoute
}

export const CreateFieldPopover = ({ context }: CreateFieldPopoverProps) => {
  const {
    params: { interfaceId },
  } = context

  const router = useRouter()
  const fieldService = useFieldService()

  const [formStep, setFormStep] = useState<FieldFormStep>(
    FieldFormStep.CreateFieldFormStep,
  )

  const [formState, setFormState] = useState<IFieldCreateData>()
  const createFieldFormSubmitRef = useRef<Maybe<SubmitController>>(undefined)
  const defaultValueFormSubmitRef = useRef<Maybe<SubmitController>>(undefined)
  const { createPopover } = useFieldService()
  const closePopover = () => createPopover.close(router, context)

  const createFieldFormToolbar =
    formStep === FieldFormStep.CreateFieldFormStep
      ? [
          {
            cuiKey: UiKey.FieldToolbarItemCreateNext,
            icon: <SaveOutlined />,
            label: 'Next',
            onClick: () => createFieldFormSubmitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.FieldToolbarItemCreateCancel,
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
            cuiKey: UiKey.FieldToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => defaultValueFormSubmitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.FieldToolbarItemCreateBack,
            icon: <CloseOutlined />,
            label: 'Back',
            onClick: () => setFormStep(FieldFormStep.CreateFieldFormStep),
          },
        ]
      : []

  return (
    <CuiSidebarSecondary
      id={UiKey.FieldPopoverCreate}
      toolbar={{
        items:
          formStep === FieldFormStep.CreateFieldFormStep
            ? createFieldFormToolbar
            : defaultValueFormToolbar,
        title: 'Create Field toolbar',
      }}
    >
      <CreateFieldForm
        disabled={formStep === FieldFormStep.DefaultValueFormStep}
        interfaceId={interfaceId}
        onSubmit={(data) => {
          setFormState(data)
          setFormStep(FieldFormStep.DefaultValueFormStep)
        }}
        onSubmitSuccess={() => null}
        submitRef={createFieldFormSubmitRef}
      />

      {formStep === FieldFormStep.DefaultValueFormStep && formState && (
        <FieldDefaultValueForm
          fieldType={formState.fieldType}
          onSubmit={async (data) => {
            await fieldService.create({
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
