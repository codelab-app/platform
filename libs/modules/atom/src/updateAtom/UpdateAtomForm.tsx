import {
  refetchGetAtomsQuery,
  useGetAtomsQuery,
  useUpdateAtomMutation,
} from '@codelab/dgraph'
import {
  AtomType,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields, SelectField } from 'uniforms-antd'
import { UpdateAtomInput, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (props: UniFormUseCaseProps<UpdateAtomInput>) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { updateId: updateAtomId } = state

  /* const [mutate, { loading: updating }] = useUpdateAtomMutation({
   *   refetchQueries: [refetchGetAtomsQuery()],
   * }) */

  /* useEffect(() => {
     *   setLoading(updating)
     * }, [updating])

     * const { data, loading } = useGetAtomsQuery({
     *   variables: {
     *     filter: {
     *       id: updateAtomId as any,
     *     },
     *   },
     * })

     * const atom = data?.queryAtom ? data.queryAtom[0] : undefined */
  const atom = {
    type: 'Button',
    props: ['disabled', 'block'],
  }

  /* if (loading) {
   *   return <Spin />
   * } */

  const onSubmit = (submitData: DeepPartial<UpdateAtomInput>) => {
    /* return mutate({
     *   variables: {
     *     input: {
     *       filter: {
     *         id: updateAtomId as any,
     *       },
     *       set: {
     *         label: submitData.label,
     *         type: submitData.type,
     *       },
     *     },
     *   },
     * }) */
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

  const atomTypesOptions = _.chain(Object.values(AtomType))
    .orderBy('label')
    .map((v) => ({ label: v, value: v }))
    .value()

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateAtomSchema}
      model={{ type: atom?.type, props: atom?.props }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
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
