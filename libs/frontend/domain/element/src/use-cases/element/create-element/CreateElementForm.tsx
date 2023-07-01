import type { ICreateElementData } from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/abstract/core'
import {
  SelectActionField,
  SelectAnyElement,
} from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { useRequiredParentValidator } from '../../../utils'
import { createElementSchema } from './create-element.schema'

export const CreateElementForm = observer(() => {
  const { elementService, userService } = useStore()
  const { metadata, parentElement } = elementService.createForm
  const elementOptions = metadata?.elementOptions
  const { validateParentForCreate } = useRequiredParentValidator()

  if (!parentElement) {
    return null
  }

  const onSubmit = async (data: ICreateElementData) => {
    const { prevSibling } = data

    const isValidParent = validateParentForCreate(
      data.renderType?.id,
      data.parentElement?.id,
    )

    if (!isValidParent) {
      return Promise.reject()
    }

    void (prevSibling
      ? elementService.createElementAsNextSibling(data)
      : elementService.createElementAsFirstChild(data))

    closeModal()

    return Promise.resolve()
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating element',
  })

  const closeModal = () => elementService.createForm.close()

  const model = {
    id: v4(),
    owner: userService.user.auth0Id,
    parentElement: {
      id: parentElement.id,
    },
    // Needs to be null initially so that required sub-fields
    // are not validated when nothing is selected yet
    renderType: null,
  }

  const parentAtom = isAtomInstance(parentElement.renderType)
    ? parentElement.renderType.current
    : undefined

  return (
    <Form<ICreateElementData>
      data-testid="create-element-form"
      model={model}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onSubmitSuccess={closeModal}
      schema={createElementSchema}
    >
      <AutoFields
        omitFields={[
          'parentElement',
          'customCss',
          'guiCss',
          'propsData',
          'prevSibling',
          'preRenderAction',
          'postRenderAction',
          'renderType',
          'name',
        ]}
      />
      <AutoField
        component={(props: UniformSelectFieldProps) => (
          <SelectAnyElement
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            allElementOptions={elementOptions}
          />
        )}
        help={`only elements from \`${parentElement.closestContainerNode.name}\` are visible in this list`}
        name="parentElement.id"
      />
      <SelectLinkElement
        allElementOptions={elementOptions}
        name="prevSibling.id"
        required={false}
      />
      <RenderTypeCompositeField name="renderType" parentAtom={parentAtom} />
      <SelectActionField name="preRenderAction" />
      <SelectActionField name="postRenderAction" />
      <Divider />
      <AutoComputedElementNameField label="Name" name="name" />
      <FormController onCancel={closeModal} submitLabel="Create Element" />
    </Form>
  )
})

CreateElementForm.displayName = 'CreateElementForm'
