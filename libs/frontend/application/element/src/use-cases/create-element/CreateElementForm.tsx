'use client'

import type { IFormController } from '@codelab/frontend-abstract-types'
import type { IElementDto } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx-context'
import { Form } from '@codelab/frontend-presentation-components-form'
import {
  IElementRenderTypeKind,
  IElementTypeKind,
} from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import type { ICreateElementDto } from './create-element.schema'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeField } from '../../components/render-type-field'
import { useElementService } from '../../services/element.service'
import { useRequiredParentValidator } from '../../validation/useRequiredParentValidator.hook'
import { createElementSchema } from './create-element.schema'
import { isRuntimeElement } from '@codelab/frontend-abstract-application'
import { isPage } from '@codelab/frontend-abstract-domain'

/**
 * The `observer` here is causing the form to re-render when we create new element. It's odd at first since why would the parent change if we're using siblings to represent the children.
 *
 * Turns out newly added are inserted as first child, which is changing the parent's properties, and causing the observability to re-render. Instead, we add the element as next sibling of the last child.
 */
export const CreateElementForm = observer<IFormController>((props) => {
  // Destructure to pass into tracker hooks
  const { onSubmitSuccess, submitRef } = props

  const { actionDomainService, atomDomainService, elementDomainService } =
    useDomainStore()

  const { builderService } = useApplicationStore()
  const elementService = useElementService()
  const user = useUser()
  const { validateParentForCreate } = useRequiredParentValidator()

  /**
   * Accessing `treeViewNode` is causing the form to re-render, but we don't see it because we're accessing the element id, which is not changing.
   */
  const selectedRuntimeElement =
    builderService.selectedNode?.current &&
    isRuntimeElement(builderService.selectedNode.current)
      ? builderService.selectedNode.current
      : undefined

  const selectedElement = selectedRuntimeElement?.element.current

  if (!selectedElement) {
    return null
  }

  const store = selectedElement.closestContainerNode.store.current

  const providerStore = isPage(selectedElement.closestContainerNode)
    ? selectedElement.closestContainerNode.providerPage?.store.current
    : undefined

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

    return elementService.create(data)
  }

  const model = {
    closestContainerNode: {
      id: selectedElement.closestContainerNode.id,
    },
    id: v4(),
    name: '',
    owner: {
      id: user.id,
    },
    parentElement: {
      id: selectedElement.id,
    },
    props: {
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
          'preRenderActions',
          'postRenderActions',
          'renderType',
          'name',
          'props',
          'tailwindClassNames',
        ]}
      />
      <AutoField name="props.data" />
      <AutoField
        extra={`only elements from \`${selectedElement.closestContainerNode.name}\` are visible in this list`}
        name="parentElement.id"
        options={elementDomainService.getSelectOptions(
          selectedElement,
          IElementTypeKind.AllElements,
          [model.id],
        )}
      />
      <RenderTypeField
        name="renderType"
        parentComponent={selectedElement.closestContainerComponent}
        parentElement={selectedElement}
      />
      <AutoField
        name="preRenderActions"
        options={actionDomainService.getSelectActionOptions(
          store,
          providerStore,
        )}
      />
      <AutoField
        name="postRenderActions"
        options={actionDomainService.getSelectActionOptions(
          store,
          providerStore,
        )}
      />
      <AutoComputedElementNameField label="Name" name="name" />
    </Form>
  )
})

CreateElementForm.displayName = 'CreateElementForm'
