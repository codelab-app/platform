import {
  createNotificationHandler,
  FormUniforms,
  FormUniformsProps,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  CreatePageElementInput,
  UpdatePageElementData,
  useGetAtomsQuery,
} from '@codelab/graphql'
import React, { useContext } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { PageContext } from '../../providers'
import { createPageElementSchema } from './createPageElementSchema'

type PageElementFormBaseProps = UniFormUseCaseProps<
  CreatePageElementInput | UpdatePageElementData
> &
  Pick<
    FormUniformsProps<CreatePageElementInput>,
    'onSubmit' | 'onSubmitSuccess' | 'model' | 'autosave' | 'autosaveDelay'
  >

/**
 * The base form for both CreatePageElementForm and UpdatePageElementForm
 */
export const PageElementFormBase = (props: PageElementFormBaseProps) => {
  const { page } = useContext(PageContext)
  const { data: atoms } = useGetAtomsQuery()

  if (!page) {
    return null
  }

  const pageElementOptions = [
    { label: page.rootElement.name, value: page.rootElement.id },
    ...page.rootElement.descendants.map((element) => ({
      label: element.name,
      value: element.id,
    })),
  ]

  console.log(page.rootElement.id)

  return (
    <FormUniforms<CreatePageElementInput>
      schema={createPageElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page element',
      })}
      {...props}
    >
      <AutoFields omitFields={['parentPageElementId', 'atomId']} />

      <SelectField
        name="atomId"
        label="Atom"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={atoms?.atoms.map((atom) => ({
          label: atom.type,
          value: atom.id,
        }))}
      />

      <SelectField
        name="parentPageElementId"
        label="Parent element"
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={pageElementOptions}
      />
    </FormUniforms>
  )
}
