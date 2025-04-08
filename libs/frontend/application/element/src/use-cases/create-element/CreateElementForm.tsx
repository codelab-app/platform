'use client'

import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { IFormController } from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectActionsField,
  SelectElementField,
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
import { useElementService } from '../../services/element.service'
import { useRequiredParentValidator } from '../../validation/useRequiredParentValidator.hook'
import { createElementSchema } from './create-element.schema'

interface CreateElementFormProps extends IFormController {
  // Prevent builder circular dep
  selectedNode?: IRuntimeModel
  showFormControl?: boolean
}

/**
 * The `observer` here is causing the form to re-render when we create new element. It's odd at first since why would the parent change if we're using siblings to represent the children.
 *
 * Turns out newly added are inserted as first child, which is changing the parent's properties, and causing the observability to re-render. Instead, we add the element as next sibling of the last child.
 */
export const CreateElementForm = observer<CreateElementFormProps>((props) => {
  // Destructure to pass into tracker hooks
  const {
    onSubmitSuccess,
    selectedNode,
    showFormControl = true,
    submitRef,
  } = props

  const { atomDomainService, elementDomainService } = useDomainStore()
  const user = useUser()
  const { validateParentForCreate } = useRequiredParentValidator()
  /**
   * Accessing `treeViewNode` is causing the form to re-render, but we don't see it because we're accessing the element id, which is not changing.
   */
  const selectedElementId = selectedNode?.treeViewNodePreview.element?.id
  const elementService = useElementService()

  // If we rely on the parentElement object for state, let's track it too
  const selectedElement = elementDomainService.elements.get(
    selectedElementId ?? '',
  )

  if (!selectedElement) {
    return null
  }

  const onSubmit = (data: IElementDto) => {
    const isValidParent = validateParentForCreate(
      data.renderType.id,
      data.parentElement?.id,
    )

    if (!isValidParent) {
      return Promise.reject()
    }

    if (selectedElement.children.length > 0) {
      data.prevSibling =
        selectedElement.children[selectedElement.children.length - 1]
      data.parentElement = null
    }

    return elementService.create(data, selectedNode)
  }

  const model = {
    closestContainerNode: {
      id: selectedElement.closestContainerNode.id,
    },
    id: v4(),
    owner: {
      id: user.id,
    },
    parentElement: {
      id: selectedElement.id,
    },
    props: {
      api: { id: v4() },
      data: '{}',
      id: v4(),
    },
    renderType: {
      __typename: IElementRenderTypeKind.Atom,
      id: atomDomainService.defaultRenderType.id,
    },
  }

  return (
    <Form<ICreateElementDto>
      cssString="position: relative;"
      errorMessage="Error while creating element"
      model={model}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={createElementSchema}
      submitRef={submitRef}
      successMessage="Element created successfully"
      uiKey={UiKey.ElementFormCreate}
    >
      <AutoFields
        omitFields={[
          'id',
          'parentElement',
          'style',
          'propsData',
          'prevSibling',
          'preRenderActions',
          'postRenderActions',
          'renderType',
          'name',
          'tailwindClassNames',
        ]}
      />
      <AutoField
        component={SelectElementField}
        help={`only elements from \`${selectedElement.closestContainerNode.name}\` are visible in this list`}
        name="parentElement.id"
      />
      <RenderTypeField
        name="renderType"
        parentComponent={selectedElement.closestContainerComponent}
        parentElement={selectedElement}
      />
      <SelectActionsField name="preRenderActions" selectedNode={selectedNode} />
      <SelectActionsField
        name="postRenderActions"
        selectedNode={selectedNode}
      />
      <Divider />
      <AutoComputedElementNameField label="Name" name="name" />
      <DisplayIf condition={showFormControl}>
        <FormController submitLabel="Create Element" />
      </DisplayIf>
    </Form>
  )
})

CreateElementForm.displayName = 'CreateElementForm'
