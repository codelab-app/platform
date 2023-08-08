import type {
  IElement,
  IUpdateBaseElementData,
  IUpdateElementData,
} from '@codelab/frontend/abstract/core'
import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { SelectActionField } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
  Form,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { Collapse } from 'antd'
import omit from 'lodash/omit'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { AutoComputedElementNameField } from '../../../components/auto-computed-element-name'
import ChildMapperCompositeField from '../../../components/ChildMapperCompositeField'
import RenderTypeCompositeField from '../../../components/RenderTypeCompositeField'
import { getElementModel } from '../../../utils/get-element-model'
import { updateElementSchema } from './update-element.schema'

export interface UpdateElementFormProps {
  element: IElement
}

/** Not intended to be used in a modal */
export const UpdateElementForm = observer<UpdateElementFormProps>(
  ({ element }) => {
    const { elementService } = useStore()
    const model = getElementModel(element)

    const onSubmit = (data: IUpdateElementData) => {
      return elementService.update(data)
    }

    const propsData = React.useMemo(() => {
      // Include component instance props on the selection of props
      const props = mergeProps(
        element.runtimeProp?.evaluatedProps,
        element.parentComponent?.current.runtimeProp?.evaluatedProps,
      )

      const stateProps = Object.entries(element.store.current.state).reduce<
        Record<string, unknown>
      >((acc, [key, val]) => {
        acc[`state.${key}`] = val

        return acc
      }, {})

      const rootStateProps = Object.entries(
        element.providerStore?.current.state ?? {},
      ).reduce<Record<string, unknown>>((acc, [key, val]) => {
        acc[`rootState.${key}`] = val

        return acc
      }, {})

      const refsProps = Object.entries(element.store.current.refs).reduce<
        Record<string, unknown>
      >((acc, [key, val]) => {
        acc[`refs.${key}`] = val

        return acc
      }, {})

      const rootRefsProps = Object.entries(
        element.providerStore?.current.refs ?? {},
      ).reduce<Record<string, unknown>>((acc, [key, val]) => {
        acc[`rootRefs.${key}`] = val

        return acc
      }, {})

      const propsAndState = mergeProps(
        props,
        stateProps,
        rootStateProps,
        refsProps,
        rootRefsProps,
      )

      return omit(propsAndState, ['key', DATA_ELEMENT_ID])
    }, [element])

    const expandedFields: Array<string> = []

    if (model.renderType?.id ?? model.renderType?.kind) {
      expandedFields.push('renderer')
    }

    if (model.postRenderAction ?? model.preRenderAction) {
      expandedFields.push('actions')
    }

    if (model.renderIfExpression) {
      expandedFields.push('renderCondition')
    }

    if (model.refKey) {
      expandedFields.push('reference')
    }

    if (
      model.childMapperPropKey ??
      model.childMapperPreviousSibling ??
      model.childMapperComponent
    ) {
      expandedFields.push('childMapper')
    }

    return (
      <Form<IUpdateBaseElementData>
        autosave
        key={element.id}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
          type: 'error',
        })}
        schema={updateElementSchema}
      >
        <AutoComputedElementNameField label="Name" name="name" />
        <AutoFields
          omitFields={[
            'childMapperComponent',
            'childMapperPreviousSibling',
            'childMapperPropKey',
            'renderIfExpression',
            'renderForEachPropKey',
            'propTransformationJs',
            // We edit it in the css tab
            'customCss',
            'guiCss',
            'preRenderAction',
            'postRenderAction',
            'renderType',
            'name',
            'refKey',
          ]}
        />
        <Collapse defaultActiveKey={expandedFields}>
          <Collapse.Panel header="Renderer" key="renderer">
            <RenderTypeCompositeField name="renderType" />
          </Collapse.Panel>
          <Collapse.Panel header="Render Condition" key="renderCondition">
            <AutoField
              component={CodeMirrorField({
                customOptions: createAutoCompleteOptions(propsData),
                language: CodeMirrorLanguage.Javascript,
              })}
              name="renderIfExpression"
            />
          </Collapse.Panel>
          <Collapse.Panel header="Hooks Actions" key="actions">
            <SelectActionField name="preRenderAction" />
            <SelectActionField name="postRenderAction" />
          </Collapse.Panel>
          <Collapse.Panel header="Child Mapper" key="childMapper">
            <ChildMapperCompositeField
              element={element}
              propsData={propsData}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Reference" key="reference">
            <AutoField name="refKey" />
          </Collapse.Panel>
        </Collapse>
      </Form>
    )
  },
)
