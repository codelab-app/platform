import {
  ComponentFragment,
  useGetComponentElementsQuery,
  useGetComponentQuery,
} from '@codelab/codegen/graphql'
import { ElementTree, useElementTree } from '@codelab/frontend/builder'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

type IComponentContext = {
  component: ComponentFragment
  tree: ElementTree
}

type ComponentProviderProps = {
  componentId: string
}

export const ComponentContext = React.createContext<IComponentContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  component: undefined!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: undefined!,
})

const _ComponentProvider = ({
  componentId,
  children,
}: PropsWithChildren<ComponentProviderProps>) => {
  const { data } = useGetComponentQuery({
    variables: { input: { componentId } },
  })

  const { data: graphData } = useGetComponentElementsQuery({
    variables: { input: { componentId } },
  })

  const component = data?.getComponent
  const tree = useElementTree(graphData?.getComponentElements)

  if (!component || !graphData) {
    return null
  }

  return (
    <ComponentContext.Provider value={{ component, tree }}>
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

export const ComponentQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  return (
    <ComponentProvider componentId={componentId}>{children}</ComponentProvider>
  )
}

export const withComponentQueryProvider = <TProps extends any>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <ComponentQueryProvider>
      <Component {...(props as any)} />
    </ComponentQueryProvider>
  )
}
