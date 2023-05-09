import { useStore } from '@codelab/frontend/presentation/container'
import { SkeletonWrapper } from '@codelab/frontend/presentation/view'
import { useAsync } from '@react-hookz/web'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ComponentList } from './ComponentList'

export const PreBuiltComponents = observer(() => {
  const { atomService } = useStore()

  const [{ error, result = [], status }, getAtoms] = useAsync(() =>
    atomService.getAll(),
  )

  useEffect(() => {
    void getAtoms.execute()
  }, [])

  return (
    <SkeletonWrapper isLoading={status === 'loading'}>
      {!isNil(error) ? error.message : null}
      <ComponentList components={result} />
    </SkeletonWrapper>
  )
})
