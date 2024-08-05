import { useAtomService } from '@codelab/frontend-application-atom/services'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { ComponentList } from './ComponentList'
import { useAtomsList } from './useAtomsList.hook'

export const PreBuiltComponents = observer(
  (props: { atoms: Array<IAtomDto> }) => {
    const atomService = useAtomService()
    const atoms = useAtomsList(props.atoms)

    const [state, getAtoms] = useAsyncFn(
      () => atomService.getAll(),
      [atomService],
    )

    useEffect(() => {
      void getAtoms()
    }, [getAtoms])

    return (
      <SkeletonWrapper isLoading={state.loading}>
        {!isNil(state.error) ? state.error.message : null}
        {/* <ComponentList components={state.value ?? []} /> */}
        <ComponentList components={atoms} />
      </SkeletonWrapper>
    )
  },
)
