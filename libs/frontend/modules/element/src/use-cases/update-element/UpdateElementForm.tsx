import { BaseMutationOptions } from '@apollo/client'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/view/components'
import {
  AutoComplete,
  AutoCompleteProps as DefaultAutoCompleteProps,
} from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import React, { useState } from 'react'
import { connectField } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementTreeGraphql } from '../../tree'
import { useGetElementQuery } from '../get-element'
import { useUpdateElementMutation } from './UpdateElement.api.graphql.gen'
import { UpdateElementSchema, updateElementSchema } from './updateElementSchema'

export type UpdateElementFormProps =
  UniFormUseCaseProps<UpdateElementSchema> & {
    elementId: string
    tree: ElementTreeGraphql
    refetchQueries?: BaseMutationOptions['refetchQueries']
    providePropCompletion?: (searchValue: string) => Array<string>
    loadingStateKey?: string
  }

type AutoCompleteProps = DefaultAutoCompleteProps & Record<string, any>

const AutoCompleteField = connectField<AutoCompleteProps>((props) => {
  return (
    <FormItem {...props}>
      <AutoComplete {...props} />
    </FormItem>
  )
})

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  elementId,
  refetchQueries,
  tree,
  providePropCompletion,
  loadingStateKey,
  ...props
}: UpdateElementFormProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  const [propCompleteOptions, setPropCompleteOptions] = useState<
    Array<{ label: string; value: string }>
  >([])

  const { data: getElementData } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const element = getElementData?.getElement

  const [mutate] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: refetchQueries,
  })

  if (!element) {
    return null
  }

  const onSubmit = (submitData: UpdateElementSchema) => {
    const promise = mutate({
      variables: {
        input: { id: element.id, data: { ...submitData } },
      },
    })

    if (loadingStateKey) {
      trackPromise(promise)
    }

    return promise
  }

  const componentId = tree.getComponentOfElement(elementId)?.id

  return (
    <div>
      <FormUniforms<UpdateElementSchema>
        key={element.id}
        autosave={true}
        autosaveDelay={200}
        schema={updateElementSchema}
        model={{
          atomId: element.atom?.id,
          name: element.name,
          componentId,
          renderForEachPropKey: element.renderForEachPropKey,
          renderIfPropKey: element.renderIfPropKey,
          css: element.css,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields
          omitFields={[
            'atomId',
            'componentId',
            'renderIfPropKey',
            'renderForEachPropKey',
            'css', // We edit it in the css tab
          ]}
        />

        <AutoField name="atomId" component={SelectAtom} />
        <AutoField name="componentId" component={SelectComponent} />
        <AutoCompleteField
          name={'renderIfPropKey'}
          onSearch={(value: string) => {
            if (providePropCompletion) {
              setPropCompleteOptions(
                providePropCompletion(value).map((option) => ({
                  value: option,
                  label: option,
                })),
              )
            }
          }}
          options={propCompleteOptions}
        />
        <AutoCompleteField
          name={'renderForEachPropKey'}
          onSearch={(value: string) => {
            if (providePropCompletion) {
              setPropCompleteOptions(
                providePropCompletion(value).map((option) => ({
                  value: option,
                  label: option,
                })),
              )
            }
          }}
          options={propCompleteOptions}
        />
      </FormUniforms>
    </div>
  )
}
