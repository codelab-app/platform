import type {} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import {
  SelectActionField,
  SelectAnyElement,
} from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import type {
  Maybe,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import { RenderTypeCompositeField } from '../../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../../components/SelectLinkElement'
import { useRequiredParentValidator } from '../../../utils'
import { createElementSchema } from './create-element.schema'

interface CreateElementFormProps {
  showFormControl?: boolean
  submitRef: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateElementForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateElementFormProps) => {
    const { elementService, userService } = useStore()
    const { createElementService } = elementService
    const { metadata, parentElement } = elementService.createForm
    const elementOptions = metadata?.elementOptions
    const { validateParentForCreate } = useRequiredParentValidator()

    if (!parentElement) {
      return null
    }

    const onSubmit = async (data: IElementDTO) => {
      const { prevSibling } = data

      const isValidParent = validateParentForCreate(
        data.renderType.id,
        data.parentElement?.id,
      )

      if (!isValidParent) {
        return Promise.reject()
      }

      void (prevSibling
        ? createElementService.createElementAsNextSibling(data)
        : createElementService.createElementAsFirstChild(data))

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const closeForm = () => elementService.createForm.close()

    const model = {
      id: v4(),
      owner: userService.user.auth0Id,
      parentElement: {
        id: parentElement.id,
      },
      // TODO: Couldn't we only validate when field is changed or submitted?
      // Needs to be null initially so that required sub-fields
      // are not validated when nothing is selected yet
      // renderType: null,
    }

    const parentAtom = isAtomInstance(parentElement.renderType)
      ? parentElement.renderType.current
      : undefined

    return (
      <Form<IElementDTO>
        data-testid="create-element-form"
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating element',
        })}
        onSubmitSuccess={closeForm}
        schema={createElementSchema}
        submitRef={submitRef}
      >
        <AutoFields
          omitFields={[
            'parentElement',
            'style',
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
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Element" />
        </DisplayIf>
      </Form>
    )
  },
)

CreateElementForm.displayName = 'CreateElementForm'
