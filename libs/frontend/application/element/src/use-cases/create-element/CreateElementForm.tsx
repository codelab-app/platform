'use client'

import { isAtom } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import {
  SelectActionField,
  SelectAnyElement,
} from '@codelab/frontend-application-type/interface-form'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type {
  Maybe,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeCompositeField } from '../../components/RenderTypeCompositeField'
import { SelectLinkElement } from '../../components/SelectLinkElement'
import { useRequiredParentValidator } from '../../validation/useRequiredParentValidator.hook'
import type { ICreateElementDto } from './create-element.schema'
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
    const { atomDomainService, userDomainService } = useDomainStore()
    const { elementService } = useStore()
    const { metadata, parentElement } = elementService.createForm
    const elementOptions = metadata?.elementOptions
    const { validateParentForCreate } = useRequiredParentValidator()

    if (!parentElement) {
      return null
    }

    const onSubmit = async (data: IElementDto) => {
      const isValidParent = validateParentForCreate(
        data.renderType.id,
        data.parentElement?.id,
      )

      if (!isValidParent) {
        return Promise.reject()
      }

      if (data.prevSibling) {
        delete data.parentElement
      }

      await elementService.createElement(data)

      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const closeForm = () => {
      return elementService.createForm.close()
    }

    const model = {
      id: v4(),
      owner: userDomainService.user.auth0Id,
      parentElement: {
        id: parentElement.id,
      },
      props: {
        api: { id: v4() },
        data: '',
        id: v4(),
      },
      renderType: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __typename: IElementRenderTypeKind.Atom,
        id: atomDomainService.defaultRenderType.id,
      },
      // TODO: Couldn't we only validate when field is changed or submitted?
      // Needs to be null initially so that required sub-fields
      // are not validated when nothing is selected yet
      // renderType: null,
    }

    const parentAtom = isAtom(parentElement.renderType.current)
      ? parentElement.renderType.current
      : undefined

    return (
      <Form<ICreateElementDto>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating element',
        })}
        onSubmitSuccess={closeForm}
        schema={createElementSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateElement.key}
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
            'tailwindClassNames',
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
        {/** We likely won't expose this, since it is difficult for users to understand this. The real world scenario would always create under parent, then drag to re-arrange */}
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
