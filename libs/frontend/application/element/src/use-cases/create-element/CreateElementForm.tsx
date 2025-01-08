'use client'

import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IFormController } from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type {
  ObjectLike,
  UniformSelectFieldProps,
} from '@codelab/shared/abstract/types'

import { isAtom } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectActionsField,
  SelectAnyElement,
} from '@codelab/frontend/presentation/components/interface-form'
import { tracker, useModelDiff } from '@codelab/frontend/shared/utils'
import { useUser } from '@codelab/frontend-application-user/services'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Divider } from 'antd'
import { diff } from 'deep-object-diff'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { isEqual } from 'radash'
import { useRef } from 'react'
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
export const CreateElementForm = observer<CreateElementFormProps>(
  ({ onSubmitSuccess, selectedNode, showFormControl = true, submitRef }) => {
    const { atomDomainService, elementDomainService } = useDomainStore()
    const user = useUser()
    const { validateParentForCreate } = useRequiredParentValidator()
    const selectedElementId = selectedNode?.treeViewNode.element?.id
    const elementService = useElementService()

    // This way we push the conditional after the model diff
    const parentElement = elementDomainService.elements.get(
      selectedElementId ?? '',
    )

    // tracker.useModelDiff('Parent element', parentElement)
    tracker.useRenderedCount('CreateElementForm')

    if (!parentElement) {
      return null
    }

    // tracker.useModelDiff('Selected node', selectedNode)
    // tracker.useModelDiff('Props', {
    //   onSubmitSuccess,
    //   selectedNode,
    //   showFormControl,
    //   submitRef,
    // })

    const onSubmit = (data: IElementDto) => {
      const isValidParent = validateParentForCreate(
        data.renderType.id,
        data.parentElement?.id,
      )

      if (!isValidParent) {
        return Promise.reject()
      }

      // if (data.prevSibling) {
      //   delete data.parentElement
      // }

      /**
       * We want to append the element as last child.
       *
       * If children already exists, then we want to append it as next sibling of the last child.
       */

      if (parentElement.children.length > 0) {
        data.prevSibling =
          parentElement.children[parentElement.children.length - 1]
        data.parentElement = null
      }

      return elementService.create(data)
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
        onSubmitSuccess={onSubmitSuccess}
        schema={createElementSchema}
        submitRef={submitRef}
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
          component={(props: UniformSelectFieldProps) => (
            <SelectAnyElement
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              // elementOptions={elementOptions}
            />
          )}
          help={`only elements from \`${parentElement.closestContainerNode.name}\` are visible in this list`}
          name="parentElement.id"
        />
        {/** We likely won't expose this, since it is difficult for users to understand this. The real world scenario would always create under parent, then drag to re-arrange */}
        {/* <SelectLinkElement
          elementOptions={elementOptions}
          name="prevSibling.id"
        /> */}
        <RenderTypeField name="renderType" parentAtom={parentAtom} />
        <SelectActionsField
          name="preRenderActions"
          selectedNode={selectedNode}
        />
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
  },
)

CreateElementForm.displayName = 'CreateElementForm'
