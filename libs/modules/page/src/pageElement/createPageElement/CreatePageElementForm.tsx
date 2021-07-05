import {
  CreatePageElementInput,
  refetchGetPageQuery,
  useCreatePageElementMutation,
  useGetAtomsQuery,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useContext, useEffect, useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { PageContext } from '../../providers'
import { createPageElementSchema } from './createPageElementSchema'

interface CreatePageElementFormProps
  extends UniFormUseCaseProps<CreatePageElementInput> {
  initialParentElementId?: string
}

export const CreatePageElementForm = ({
  initialParentElementId,
  ...props
}: CreatePageElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PageElement)
  const { pageId, page } = useContext(PageContext)
  const { data: atoms } = useGetAtomsQuery()
  const initialParentElementIdRef = useRef(initialParentElementId)

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

  const [mutate, { loading: creating }] = useCreatePageElementMutation({
    refetchQueries: [refetchGetPageQuery({ input: { pageId: pageId || '' } })],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: CreatePageElementInput) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
        },
      },
    })
  }

  return (
    <FormUniforms<CreatePageElementInput>
      schema={createPageElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page element',
      })}
      onSubmit={onSubmit}
      onSubmitSuccess={() => reset()}
      model={{ parentPageElementId: initialParentElementIdRef.current }}
      {...props}
    >
      <AutoFields omitFields={['parentPageElementId', 'atomId']} />

      <SelectField
        name="atomId"
        label="Atom"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={atoms?.atoms.map((atom) => ({
          label: atom.label,
          value: atom.id,
        }))}
      />

      <SelectField
        name="parentPageElementId"
        label="Parent element"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={pageElementOptions}
      />
    </FormUniforms>
  )
}
