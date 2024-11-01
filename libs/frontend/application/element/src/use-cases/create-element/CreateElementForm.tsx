'use client'

import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type {
  Maybe,
  Nullable,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'

import { isAtom } from '@codelab/frontend/abstract/domain'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectActionField,
  SelectAnyElement,
} from '@codelab/frontend/presentation/components/interface-form'
import { useUser } from '@codelab/frontend-application-user/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import type { ICreateElementDto } from './create-element.schema'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeField } from '../../components/render-type-field'
import { SelectLinkElement } from '../../components/SelectLinkElement'
import { useElementService } from '../../services/element.service'
import { useRequiredParentValidator } from '../../validation/useRequiredParentValidator.hook'
import { createElementSchema } from './create-element.schema'
import { useCreateElementForm } from './create-element.state'

interface CreateElementFormProps {
  // Prevent builder ciricular dep
  selectedNode?: Nullable<IRuntimeModel>
  showFormControl?: boolean
  submitRef: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateElementForm = observer<CreateElementFormProps>(
  ({ onSubmitSuccess, selectedNode, showFormControl = true, submitRef }) => {
    const { atomDomainService } = useDomainStore()
    const user = useUser()
    const elementService = useElementService()
    const createElementForm = useCreateElementForm()
    const element = createElementForm.data
    const parentElement = element?.parentElement
    const elementOptions = element?.elementOptions
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
      return createElementForm.close()
    }

    const model = {
      closestContainerNode: {
        id: parentElement.closestContainerNode.id,
      },
      id: v4(),
      owner: user.auth0Id,
      parentElement: {
        id: parentElement.id,
      },
      props: {
        api: { id: v4() },
        data: '{}',
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
        cssString="position: relative;"
        errorMessage="Error while creating element"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={closeForm}
        schema={createElementSchema}
        submitRef={submitRef}
        uiKey={UiKey.ElementFormCreate}
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
        />
        <RenderTypeField name="renderType" parentAtom={parentAtom} />
        <SelectActionField name="preRenderAction" selectedNode={selectedNode} />
        <SelectActionField
          name="postRenderAction"
          selectedNode={selectedNode}
        />
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
