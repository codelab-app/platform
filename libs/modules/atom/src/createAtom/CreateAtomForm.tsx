import { refetchGetAtomsQuery, useCreateAtomMutation } from '@codelab/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  LibraryContext,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { CreateAtomInput, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomInput>

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Atom)
  /* const { libraries } = useContext(LibraryContext) */

  // Only Editors can modify Atoms (dgraph permissions?)
  const [mutate, { loading: creating }] = useCreateAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreateAtomInput>) => {
    return mutate({
      variables: {
        input: {
          label: submitData.label as string,
          type: submitData.type as string,
          library: {
            id: submitData.library_id,
          },
        },
      },
    })
  }

  const atomTypes = [
    {
      name: 'Button',
      id: 'button',
    },
    {
      name: 'Text',
      id: 'text',
    },
    {
      name: 'Input',
      id: 'input',
    },
  ]

  const availableProps = [
    {
      name: 'block',
      id: 'block',
    },
    {
      name: 'danger',
      id: 'danger',
    },
    {
      name: 'disabled',
      id: 'disabled',
    },
    {
      name: 'ghost',
      id: 'ghost',
    },
  ]

  return (
    <FormUniforms<CreateAtomInput>
      onSubmit={onSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore https://github.com/vazco/uniforms/issues/951
      layout="horizontal"
      {...props}
    >
      {/* <SelectField
            name="library_id"
            label="Library"
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore https://github.com/vazco/uniforms/issues/951
            showSearch={true}
            optionFilterProp="label"
            options={libraries?.map((library) => ({
            label: library.name,
            value: library.id,
            }))}
            /> */}

      <SelectField
        name="type"
        label="Type"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        labelCol={{ span: 3 }}
        colon={false}
        options={atomTypes?.map((atomType) => ({
          label: atomType.name,
          value: atomType.id,
        }))}
      />
      <SelectField
        name="props"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        allowClear
        mode="multiple"
        optionFilterProp="label"
        colon={false}
        labelCol={{ span: 3 }}
        options={availableProps?.map((prop) => ({
          label: prop.name,
          value: prop.id,
        }))}
      />
    </FormUniforms>
  )
}
