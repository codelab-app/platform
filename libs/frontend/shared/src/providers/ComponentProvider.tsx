import React, { PropsWithChildren } from 'react'
import {
  GetComponentDetailQuery,
  useGetComponentDetailQuery,
} from '@codelab/hasura'
import { PropsWithIds } from '../interfaces'

type IComponentContext = PropsWithIds<'componentId'> & {
  component?: GetComponentDetailQuery['component_by_pk']
  loading: boolean
}

export const ComponentContext = React.createContext<IComponentContext>(
  undefined!,
)

const _ComponentProvider = ({
  componentId,
  children,
}: PropsWithChildren<Pick<IComponentContext, 'componentId'>>) => {
  const { data, loading } = useGetComponentDetailQuery({
    variables: {
      componentId,
    },
  })

  return (
    <ComponentContext.Provider
      value={{
        componentId,
        component: data?.component_by_pk,
        loading,
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}

export const ComponentProvider = React.memo(
  _ComponentProvider,
  (prev, next) => {
    return prev.componentId !== next.componentId
  },
)
