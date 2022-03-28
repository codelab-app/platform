import { useEffect, useMemo, useState } from 'react'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { useQuery } from 'react-query'
import { ModalInterfaceForm, SpinnerWrapper } from '@codelab/frontend/view/components'
import { AutoField, AutoFields } from 'uniforms-antd'
import { SelectResourceAtom } from '@codelab/frontend/modules/type'
import { useResourceAtom } from '../hooks/useResourceAtom'
import { AtomType } from '@codelab/shared/abstract/codegen-v2'

export const ResourceModalInterfaceForm = (props: any) => {
  const {
    typeService,
    ...rest
  } = props


  const [currentAtomType, setCurrentAtomType] = useState(props?.model?.type || AtomType.ResourceREST)
  const { resourceAtomByType, isLoading } = useResourceAtom()

  const [getInterfaceType, { data: interfaceType }] =
    useLoadingState((_id: string) =>
      typeService.getInterfaceAndDescendants({ id: _id }),
    )

  useEffect(() => {
    if (!currentAtomType) return
    const atom = resourceAtomByType[currentAtomType]
    if (!atom) return

    getInterfaceType(atom.api.id)
  }, [resourceAtomByType])


  return (
    <SpinnerWrapper isLoading={isLoading || !interfaceType}>
      <ModalInterfaceForm {...rest} interfaceType={interfaceType}>
        <AutoFields omitFields={["type"]} />
        <AutoField component={SelectResourceAtom} name="type" />
      </ModalInterfaceForm>
    </SpinnerWrapper>
  )
}