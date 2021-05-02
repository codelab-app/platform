import React, { PropsWithChildren } from 'react'
import {
  Maybe,
  useGetComponentDetailQuery,
  __ComponentFragment,
} from '@codelab/hasura'
import { PropsWithIds } from '../interfaces'

type IComponentContext = PropsWithIds<'componentId'> & {
  component?: Maybe<__ComponentFragment>
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

  const component = data?.component_by_pk

  return (
    <ComponentContext.Provider
      value={{
        componentId,
        component,
        loading,
      }}
    >
      {component ? <>{children}</> : null}
    </ComponentContext.Provider>
  )
}

export const ComponentProvider = React.memo(
  _ComponentProvider,
  (prev, next) => {
    return (
      prev.componentId === next.componentId
      // Don't update if we don't have new id
      // || !next.componentId
    )
  },
)
