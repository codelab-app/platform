'use client'

import type { IRuntimeElementModel } from '@codelab/frontend-abstract-application'

import {
  isAtom,
  isPage,
  type IUpdateBaseElementData,
  type IUpdateElementData,
} from '@codelab/frontend-abstract-domain'
import { UiKey } from '@codelab/frontend-abstract-types'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import {
  CodeMirrorField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import {
  SelectActionsField,
  SelectComponent,
} from '@codelab/frontend-presentation-components-interface-form'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'

import { AutoComputedElementNameField } from '../../components/AutoComputedElementNameField'
import { RenderTypeField } from '../../components/render-type-field'
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

    const runtimeProps = runtimeElement.runtimeProps
    const customOptions = createAutoCompleteOptions(runtimeProps.runtimeContext)

    // const codeMirrorField = useCustomCompareMemo(
    //   CodeMirrorField,
    //   [customOptions],
    //   isDeepEqual,
    // )

    const collapseItems = [
      {
        children: (
          <AutoField
            component={CodeMirrorField}
            customOptions={customOptions}
            language={CodeMirrorLanguage.Javascript}
            name="renderIfExpression"
          />
        ),
        key: 'renderCondition',
        label: 'Render Condition',
      },
      {
        children: (
          <>
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
            <AutoField
              name="childMapperComponent.id"
              options={componentDomainService.getSelectOptions(
                element.closestContainerComponent,
              )}
            />
            <AutoField
              name="childMapperPropKey"
              options={runtimeElement.propKeyAutoCompleteOptions}
            />
            <AutoField
              name="childMapperPreviousSibling.id"
              options={elementDomainService.getSelectOptions(
                element,
                IElementTypeKind.ChildrenOnly,
              )}
            />
          </>
        ),
        key: 'childMapper',
        label: 'Child Mapper',
      })
    }

    // Form should be the source of the update we don't want to send those changes back
    const model = useMemo(() => element.toJson, [])

    return (
      <div key={element.id}>
        <Form<IUpdateBaseElementData>
          autosave
          errorMessage="Error while updating element"
          model={model}
          onSubmit={onSubmit}
          schema={updateElementSchema}
          uiKey={UiKey.ElementFormUpdate}
        >
          <AutoComputedElementNameField label="Name" name="name" />
          <RenderTypeField
            name="renderType"
            parentComponent={element.closestContainerComponent}
            parentElement={element.parentElement?.current}
          />
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
