// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  ElementGraphFragment,
  ElementTreeGraphql,
  useElementTree,
} from '@codelab/frontend/modules/element'
import { withProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { ComponentFragment } from '../Component.fragment.graphql.gen'
import { useGetComponentQuery } from '../use-cases/get-component/GetComponent.web.graphql.gen'
import { useGetComponentElementsQuery } from '../use-cases/get-component-elements'

type IComponentContext = {
  component: ComponentFragment
  elements: ElementGraphFragment
  tree: ElementTreeGraphql
}

type ComponentProviderProps = {
  componentId: string
}

export const ComponentContext = React.createContext<IComponentContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  component: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  elements: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
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

  if (!component || !graphData?.getComponentElements) {
    return null
  }

  return (
    <ComponentContext.Provider
      value={{ component, elements: graphData.getComponentElements, tree }}
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

export const ComponentQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  return (
    <ComponentProvider componentId={componentId}>{children}</ComponentProvider>
  )
}

export const withComponentQueryProvider = withProvider(ComponentQueryProvider)
