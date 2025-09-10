'use client'

import type { IRuntimeElementModel } from '@codelab/frontend-abstract-application'

import {
  isAtom,
  isPage,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend-abstract-domain'
import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import { Form } from '@codelab/frontend-presentation-components-form'
import { IElementTypeKind } from '@codelab/shared-abstract-core'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { useElementService } from '../../services'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  runtimeElement: IRuntimeElementModel
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer(
  ({ runtimeElement }: UpdateElementFormProps) => {
    const elementService = useElementService()

    const {
      actionDomainService,
      componentDomainService,
      elementDomainService,
    } = useDomainStore()

    const onSubmit = async (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const expandedFields: Array<string> = ['childMapper']
    // `getSnapshot` is immutable and doesn't work
    const element = runtimeElement.element.current
    const store = element.store.current

    const providerStore = isPage(element.closestContainerNode)
      ? element.closestContainerNode.providerPage?.store.current
      : undefined

    if (element.renderType.id) {
      expandedFields.push('renderer')
    }

    if (element.postRenderActions?.length || element.preRenderActions?.length) {
      expandedFields.push('actions')
    }

    if (element.renderIfExpression) {
      expandedFields.push('renderCondition')
    }

    if (
      isAtom(element.renderType.current) &&
      (element.childMapperPropKey ??
        element.childMapperPreviousSibling ??
        element.childMapperComponent)
    ) {
      expandedFields.push('childMapper')
    }

    // const codeMirrorField = useCustomCompareMemo(
    //   CodeMirrorField,
    //   [customOptions],
    //   isDeepEqual,
    // )

    const collapseItems = [
      {
        children: <AutoField name="renderIfExpression" />,
        key: 'renderCondition',
        label: 'Render Condition',
      },
      {
        children: (
          <>
            <AutoField name="preRenderActions" />
            <AutoField name="postRenderActions" />
          </>
        ),
        key: 'actions',
        label: 'Hooks Actions',
      },
    ]

    if (isAtom(element.renderType.current)) {
      collapseItems.push({
        children: (
          // We don't want a composite field since there is no top level name to nest under
          <>
            <AutoField name="childMapperComponent.id" />
            <AutoField name="childMapperPropKey" />
            <AutoField name="childMapperPreviousSibling.id" />
          </>
        ),
        key: 'childMapper',
        label: 'Child Mapper',
      })
    }

    // Form should be the source of the update we don't want to send those changes back
    const model = useMemo(() => element.toJson, [])

    const runtimeProps = runtimeElement.runtimeProps

    const renderIfAutoComplete = createAutoCompleteOptions(
      runtimeProps.runtimeContext,
    )

    const actions = actionDomainService.getSelectActionOptions(
      store,
      providerStore,
    )

    const components = componentDomainService.getSelectOptions(
      element.closestContainerComponent,
    )

    const elements = elementDomainService.getSelectOptions(
      element,
      IElementTypeKind.ChildrenOnly,
    )

    const schema = useMemo(
      () =>
        updateElementSchema({
          renderIfAutoComplete,
          actions,
          components,
          elements,
          element,
        }),
      [components, elements, element, renderIfAutoComplete, actions],
    )

    return (
      <div key={element.id}>
        <Form<IUpdateBaseElementData>
          autosave
          errorMessage="Error while updating element"
          model={model}
          onSubmit={onSubmit}
          schema={schema}
          uiKey={UiKey.ElementFormUpdate}
        >
          <AutoComputedElementNameField label="Name" name="name" />
          <AutoFields
            omitFields={[
              'childMapperComponent',
              'childMapperPreviousSibling',
              'childMapperPropKey',
              'renderIfExpression',
              'renderForEachPropKey',
              // We edit it in the css tab
              'style',
              'tailwindClassNames',
              'preRenderActions',
              'postRenderActions',
              'renderType',
              'name',
            ]}
          />
          <Collapse defaultActiveKey={expandedFields} items={collapseItems} />
        </Form>
      </div>
    )
  },
)
