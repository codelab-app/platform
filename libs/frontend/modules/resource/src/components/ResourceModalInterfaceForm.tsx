import { SelectResourceAtom } from '@codelab/frontend/modules/type'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import {
  ModalInterfaceForm,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { AtomType } from '@codelab/shared/abstract/codegen'
import { useEffect, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useResourceAtom } from '../hooks/useResourceAtom'

export const ResourceModalInterfaceForm = (props: any) => {
  const { typeService, ...rest } = props

  const [currentAtomType, setCurrentAtomType] = useState(
    props?.model?.type || AtomType.ResourceREST,
  )

  const { resourceAtomByType, isLoading } = useResourceAtom()

  const [getInterfaceType, { data: interfaceType }] = useLoadingState(
    (_id: string) => typeService.getInterfaceAndDescendants({ id: _id }),
  )

  useEffect(() => {
    if (!currentAtomType) {
      return
    }

    const atom = resourceAtomByType[currentAtomType]

    if (!atom) {
      return
    }

    console.log({ atom })

    getInterfaceType(atom.api.id)
  }, [resourceAtomByType, currentAtomType])

  const onChange = (field: any, value: any) => {
    if (field !== 'type') {
      return
    }

    setCurrentAtomType(value)
  }

  const model = {
    type: currentAtomType,
    ...props.model,
  }

  return (
    <SpinnerWrapper isLoading={isLoading || !interfaceType}>
      <ModalInterfaceForm
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        interfaceType={interfaceType}
        model={model}
        onChange={onChange}
      >
        <AutoField name="name" />
        <AutoField component={SelectResourceAtom} name="type" />
        <AutoField name="url" />
        <AutoField name="httpMethod" />
        <AutoField name="header" />
        <AutoField name="queryString" />
        <AutoFields
          omitFields={['type', 'name', 'type', 'url', 'header', 'queryString']}
        />
      </ModalInterfaceForm>
    </SpinnerWrapper>
  )
}
