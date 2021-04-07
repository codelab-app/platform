import React from 'react'
import {
  PageElementProps__AttributeFragment,
  PageElementProps__PropFragment,
  Prop_Value_Type_Enum,
  useCreatePropMutation,
} from '@codelab/hasura'
import { JsonSchemaUniForm, notify } from '@codelab/frontend/shared'
import { AutoFields } from 'uniforms-antd'
import { JSONSchemaType } from 'ajv/lib/types/json-schema'
import { getJsonSchemaTypeFromAttributeType } from './getJsonSchemaTypeFromAttributeType'

export interface PropFormProps {
  propId: string | undefined
  propData: any | undefined
}

//TODO remove .hasura
//TODO autosave indicator

/**
 * This is a form that updates/creates a single prop
 */
export const PropForm = ({ propId }: PropFormProps) => {
  return <></>
}

interface CreatePropFormProps {
  /** Callback that gets called when the prop is created */
  onCreated: (propId: string) => any
  /** use this to control which attribute this prop will use */
  attribute: PageElementProps__AttributeFragment
  /** Called when a mutation is started */
  onMutationStarted?: (promise: Promise<any>) => Promise<void> | void
}

const createPropSchema = (
  attribute: UpdatePropFormProps['propData']['attribute'],
): JSONSchemaType<Record<string, string | number | boolean>> => ({
  type: 'object',
  required: [],
  properties: {
    [attribute.key]: {
      type: getJsonSchemaTypeFromAttributeType(
        attribute.valueType?.value as any,
      ),
    },
  },
})

/**
 * A form that creates a prop. Changes are saved automatically.
 * Use the onCreated param to hook up to the creation process and use the newly created id
 */
export const CreatePropForm = ({
  onCreated,
  attribute,
  onMutationStarted,
}: CreatePropFormProps) => {
  const schema = createPropSchema(attribute)

  const [mutate] = useCreatePropMutation()

  const handleSubmit = async (data: Record<string, any>) => {
    //Extract the value from the data
    const key = attribute.key
    const value = data[key]

    //Make the prop mutation
    try {
      const promise = mutate({
        variables: {
          input: {
            attribute_id: attribute.id,
            library_id: 'f70c9584-4b68-4999-a42e-1755d539b714', //TODO remove the fixed library id and make a library module
            values: {
              data: [
                {
                  //TODO support other types as well
                  type: Prop_Value_Type_Enum.String,
                  value,
                },
              ],
            },
          },
        },
      })

      if (onMutationStarted) {
        onMutationStarted(promise)
      }

      const r = await promise

      onCreated(r.data?.insert_prop_one?.id)
    } catch (e) {
      notify({ title: 'Error while saving prop' }, e)
    }
  }

  return (
    <JsonSchemaUniForm
      schema={schema}
      autosave={true}
      autosaveDelay={500}
      onSubmit={handleSubmit}
    >
      <AutoFields />
    </JsonSchemaUniForm>
  )
}

interface UpdatePropFormProps {
  propData: PageElementProps__PropFragment
}

export const UpdatePropForm = ({ propData }: UpdatePropFormProps) => {
  return <>Updating {JSON.stringify(propData)}</>
}
