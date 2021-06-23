import {
  __ComponentFragment,
  useGetComponentDetailLazyQuery,
} from '@codelab/codegen/dgraph'
import React, { PropsWithChildren, useEffect } from 'react'

type IComponentContext = {
  component: __ComponentFragment
  loading: boolean
}

type ComponentProviderProps = {
  componentId: string | undefined
}

export const ComponentContext = React.createContext<IComponentContext>({
  component: undefined!,
  loading: false,
})

const _ComponentProvider = ({
  componentId,
  children,
}: PropsWithChildren<ComponentProviderProps>) => {
  const [load, { loading, data }] = useGetComponentDetailLazyQuery({})
  const component = data?.component

  useEffect(() => {
    if (componentId) {
      load({
        variables: {
          componentId,
        },
      })
    }
  }, [componentId])

  if (!component) {
    return null
  }

  return (
    <ComponentContext.Provider
      value={{
        component,
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
    return (
      prev.componentId === next.componentId
      // Don't update if we don't have new id
      // && !!next.componentId
    )
  },
)
