import { useAtomService } from '@codelab/frontend-application-atom/services'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { useAsync } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ComponentList } from './ComponentList'
import { useAtomsList } from './useAtomsList.hook'

export const PreBuiltComponents = observer(
  (props: { atoms: Array<IAtomDto> }) => {
    const atomService = useAtomService()
    const atoms = useAtomsList(props.atoms)

    const [{ error, result = [], status }, getAtoms] = useAsync(() =>
      atomService.getAll(),
    )

    useEffect(() => {
      void getAtoms.execute()
    }, [])

    return (
      <SkeletonWrapper isLoading={status === 'loading'}>
        {!isNil(error) ? error.message : null}
        {/* <ComponentList components={result} /> */}
        <ComponentList components={atoms} />
      </SkeletonWrapper>
    )
  },
)
