import {
  DGraph__AtomFragment,
  LibraryExplorerGql,
  useCreateComponentMutation,
  useGetAtomsQuery,
} from '@codelab/codegen/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  LibraryContext,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useContext, useEffect } from 'react'
import { AutoField, SelectField } from 'uniforms-antd'
import {
  CreateComponentInput,
  createComponentSchema,
} from './createComponentSchema'

type CreateComponentFormProps = UniFormUseCaseProps<CreateComponentInput>

export const CreateComponentForm = ({ ...props }: CreateComponentFormProps) => {
  const { reset, setLoading } = useCrudModalForm(EntityType.Component)
  const { libraries } = useContext(LibraryContext)

  const [mutate, { loading: creating }] = useCreateComponentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: LibraryExplorerGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: CreateComponentInput) => {
    return mutate({
      variables: {
        input: {
          library: { id: submitData.library_id },
          label: submitData.label,
          atom: {
            id: submitData.atom_id,
          },
        },
      },
    })
  }

  const { data: atoms } = useGetAtomsQuery()

  return (
    <FormUniforms<CreateComponentInput>
      data-testid="create-component-form"
      onSubmit={onSubmit}
      schema={createComponentSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField
        name="library_id"
        label="Library"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={libraries?.map((library) => ({
          label: library.name,
          value: library.id,
        }))}
      />
      <SelectField
        name="atom_id"
        label="Atom"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={atoms?.atoms
          ?.filter((atom): atom is DGraph__AtomFragment => !!atom)
          .map((atom) => ({
            label: atom.type,
            value: atom.id,
          }))}
      />
      <AutoField name="label" />
    </FormUniforms>
  )
}
