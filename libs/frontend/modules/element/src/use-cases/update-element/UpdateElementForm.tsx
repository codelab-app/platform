import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  FormUniforms,
  UniFormUseCaseProps,
  usePromisesLoadingIndicator,
} from '@codelab/frontend/view/components'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementFragment } from '../../graphql'
import { ElementTreeGraphql } from '../../tree'
import { refetchGetElementQuery, useGetElementQuery } from '../get-element'
import { useUpdateElementMutation } from './UpdateElement.api.graphql.gen'
import { UpdateElementSchema, updateElementSchema } from './updateElementSchema'

type UpdateElementFormInternalProps =
  UniFormUseCaseProps<UpdateElementSchema> & {
    tree: ElementTreeGraphql
    element: ElementFragment
    providePropCompletion?: (searchValue: string) => Array<string>
    loadingStateKey?: string
  }

export type UpdateElementFormProps = Omit<
  UpdateElementFormInternalProps,
  'element'
> & { elementId: string }

const UpdateElementFormInternal = ({
  element: elementProp,
  tree,
  providePropCompletion,
  loadingStateKey,
  ...props
}: React.PropsWithChildren<UpdateElementFormInternalProps>) => {
  const { current: element } = useRef(elementProp) // Cache the initial element value, because when it updates it will interfere with what the user is typing
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  const [propCompleteOptions, setPropCompleteOptions] = useState<
    Array<{ label: string; value: string }>
  >([])

  const [updateElement] = useUpdateElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetElementQuery({ input: { elementId: element.id } }),
    ],
  })

  const onSubmit = (submitData: UpdateElementSchema) => {
    const promise = updateElement({
      variables: {
        input: { id: element.id, data: { ...submitData } },
      },
    })

    if (loadingStateKey) {
      trackPromise(promise)
    }

    return promise
  }

  const componentId = tree.getComponentOfElement(element.id)?.id

  const handlePropSearch = (value: string) => {
    if (providePropCompletion) {
      setPropCompleteOptions(
        providePropCompletion(value).map((option) => ({
          value: option,
          label: option,
        })),
      )
    }
  }

  return (
    <div>
      <FormUniforms<UpdateElementSchema>
        key={element.id}
        autosave={true}
        autosaveDelay={500}
        schema={updateElementSchema}
        model={{
          atomId: element.atom?.id,
          name: element.name,
          componentId,
          renderForEachPropKey: element.renderForEachPropKey,
          renderIfPropKey: element.renderIfPropKey,
          propTransformationJs: element.propTransformationJs,
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
            'propTransformationJs',
            'css', // We edit it in the css tab
          ]}
        />

        <AutoField name="atomId" component={SelectAtom} />
        <AutoField name="componentId" component={SelectComponent} />
        <AutoCompleteField
          name="renderIfPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
        <AutoCompleteField
          name="renderForEachPropKey"
          onSearch={handlePropSearch}
          options={propCompleteOptions}
        />
      </FormUniforms>
    </div>
  )
}

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  elementId,
  ...props
}: UpdateElementFormProps) => {
  const { data: getElementData } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const element = getElementData?.getElement

  if (!element) {
    return null
  }

  return <UpdateElementFormInternal element={element} {...props} />
}
