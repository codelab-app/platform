import {
  CreatePageElementPropMutation,
  PropCollection__PropFragment,
  refetchGetAppPageQuery,
  UpdatePropValueMutation,
  useCreatePageElementPropMutation,
  useUpdatePropValueMutation,
} from '@codelab/codegen/hasura'
import { AppPageContext, FormUniforms, notify } from '@codelab/frontend/shared'
import { FetchResult } from 'apollo-link'
import React, { useContext, useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import { createPropSchema } from '../createProp/createPropSchema'

export interface PropFormProps {
  /** Called when a mutation is started */
  onMutationStarted?: (promise: Promise<any>) => Promise<void> | void

  /** Pass an existing prop to update it. Or pass just the attribute in order to create a prop with this attribute */
  initialData: PropCollection__PropFragment
  // | (Pick<PageElement__PropFragment, 'attribute'> &
  //     Partial<PageElement__PropFragment>)

  /** Used when creating a new prop. It will be associated with this page element id*/
  pageElementId: string
}

/**
 * Maps a graphql prop fragment to a prop model that  the form understands
 * Currently maps only a single value, need to update it when we support multiple values
 */
export const propDataEntityToModel = (
  propData: PropCollection__PropFragment,
) => ({
  [propData.type.key]: propData.values[0].value,
})

/** A form for a single prop that contains the input field for the attribute and it's value */
export const PageElementPropForm = ({
  onMutationStarted,
  initialData,
  pageElementId,
}: PropFormProps) => {
  // Keep the current prop data in state
  const [propData, setPropData] = useState({
    ...initialData,
    values: initialData.values ?? [{ value: '', id: undefined }], // This is needed to avoid missing value when creating a new prop
  })

  const isInCreationMode = !propData?.id
  const { pageId, appId } = useContext(AppPageContext)

  // Mutations:
  const [createPageElementProp] = useCreatePageElementPropMutation({
    refetchQueries: [
      refetchGetAppPageQuery({
        pageId,
        appId,
      }),
    ],
  })

  const [updatePropValue] = useUpdatePropValueMutation({
    refetchQueries: [
      refetchGetAppPageQuery({
        pageId,
        appId,
      }),
    ],
  })

  // const schema = createPropSchema(propData.type)

  const handleSubmit = async (data: Record<string, any>) => {
    // Extract the value from the data
    const key = propData.type.key
    const value = data[key]

    try {
      // Use a different mutation depending on which mode are we in
      let promise: Promise<
        FetchResult<CreatePageElementPropMutation | UpdatePropValueMutation>
      >

      if (isInCreationMode) {
        throw new Error('Not implemented')
        // TODO fix prop creation
        // promise = createPageElementProp({
        //   variables: {
        //     pageElementId,
        //     propInput: {
        //       values: {
        //         data: [
        //           {
        //             //TODO support other types as well
        //             type: ValueType.String,
        //             value,
        //           },
        //         ],
        //       },
        //     },
        //   },
        // })
      } else {
        const propValueId = propData.values ? propData.values[0]?.id : undefined

        if (!propValueId) {
          notify({ title: 'Error. No prop value id found' })

          return
        }

        // Make the prop mutation
        promise = updatePropValue({
          variables: {
            propValueId,
            input: {
              value,
            },
          },
        })
      }

      if (onMutationStarted) {
        onMutationStarted(promise)
      }

      const response = await promise

      // If we just created a new prop, update the state data with the ids for the prop and the first value
      // That way we switch to edit mode
      const newProp = (response?.data as CreatePageElementPropMutation)
        ?.insert_prop_one

      // if (newProp?.prop_id) {
      //   setPropData((originalPropData) => ({
      //     ...(originalPropData as any),
      //     id: newProp.prop_id,
      //     values: originalPropData.values.map((value: any, i: number) =>
      //       i === 0 ? { ...value, id: newProp.prop.values[0].id } : value,
      //     ),
      //   }))
      // }
    } catch (e) {
      notify({ title: 'Error while saving prop' }, e)
    }
  }

  return (
    <FormUniforms<Record<string, string | number | boolean | null>>
      // TODO: Fix
      schema={createPropSchema as any}
      autosave={true}
      autosaveDelay={500}
      onSubmit={handleSubmit}
      model={propDataEntityToModel(propData as any)}
    >
      <AutoFields />
    </FormUniforms>
  )
}
