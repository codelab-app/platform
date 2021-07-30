import React, { PropsWithChildren } from 'react'

type IComponentContext = {
  component: any
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
  // const [load, { loading, data }] = useGetComponentDetailLazyQuery({})
  // const component = data?.component

  // useEffect(() => {
  //   if (componentId) {
  //     load({
  //       variables: {
  //         componentId,
  //       },
  //     })
  //   }
  // }, [componentId, load])
  //
  // if (!component) {
  //   return null
  // }
  //
  // return (
  //   <ComponentContext.Provider
  //     value={{
  //       component,
  //       loading,
  //     }}
  //   >
  //     {children}
  //   </ComponentContext.Provider>
  // )
  return <>{children}</>
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
