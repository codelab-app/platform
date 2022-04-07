import {
  InterfaceFormProps,
  InterfaceType,
  ModalInterfaceForm,
  SelectResourceAtom,
  WithTypeService,
} from '@codelab/frontend/modules/type'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { AtomType } from '@codelab/shared/abstract/codegen'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useResourceAtom } from '../hooks/useResourceAtom'

type ResourceModalInterfaceForm = WithTypeService &
  Omit<InterfaceFormProps<any>, 'interfaceType'>

export const ResourceModalInterfaceForm = observer<ResourceModalInterfaceForm>(
  ({ typeService, ...rest }) => {
    const [currentAtomType, setCurrentAtomType] = useState(
      rest?.model?.['type'] || AtomType.ResourceREST,
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

      getInterfaceType(atom.api.id)
    }, [resourceAtomByType, currentAtomType, getInterfaceType])

    const onChange = (field: any, value: any) => {
      if (field !== 'type') {
        return
      }

      setCurrentAtomType(value)
    }

    const model = {
      type: currentAtomType,
      ...rest.model,
    }

    return (
      <SpinnerWrapper isLoading={isLoading}>
        <ModalInterfaceForm
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          interfaceType={interfaceType as InterfaceType}
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
            omitFields={[
              'type',
              'name',
              'type',
              'url',
              'header',
              'queryString',
            ]}
          />
        </ModalInterfaceForm>
      </SpinnerWrapper>
    )
  },
)
