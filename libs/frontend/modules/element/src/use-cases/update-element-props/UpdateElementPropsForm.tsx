// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  ComponentContext,
  refetchGetComponentElementsQuery,
} from '@codelab/frontend/modules/component'
// TODO: restucture module page to get rid of this error later
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PageContext,
  refetchGetPageQuery,
} from '@codelab/frontend/modules/page'
import {
  InterfaceForm,
  TypeKindsContext,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { usePromisesLoadingIndicator } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/codegen/graphql'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext, useRef } from 'react'
import {
  refetchGetElementQuery,
  useGetElementQuery,
} from '../get-element/GetElement.web.graphql.gen'
import { useUpdateElementPropsMutation } from './UpdateElementProps.web.graphql.gen'

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: string
  loadingStateKey: string
}

const hasDataType = (
  data: Record<string, any>,
  typeKinds: Array<TypeKind>,
  typeKindsById: Record<string, TypeKind>,
) => {
  return Object.values(data).some((value) => {
    const valueTypeKind = typeKindsById[value?.type]

    if (!valueTypeKind) {
      return false
    }

    return typeKinds.includes(valueTypeKind)
  })
}

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  loadingStateKey,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)
  const { typeKindsById } = useContext(TypeKindsContext)
  const [isRefetchPage, needRefetchPage] = React.useState(false)
  const [isRefetchComponent, needRefetchComponent] = React.useState(false)
  const { pathname } = useRouter()
  const isPageBuilder = pathname === '/apps/[appId]/pages/[pageId]/builder'
  const isComponentBuilder = pathname == '/components/[componentId]'

  const { data: interfaceData, loading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const { pageId } = useContext(PageContext)
  const { component } = useContext(ComponentContext)

  const [mutate] = useUpdateElementPropsMutation({
    refetchQueries: () => {
      const queries: Array<any> = [
        refetchGetElementQuery({ input: { elementId } }),
      ]

      if (isRefetchComponent && component) {
        queries.push(
          refetchGetComponentElementsQuery({
            input: { componentId: component.id },
          }),
        )
        needRefetchComponent(false)
      }

      if (isRefetchPage) {
        queries.push(refetchGetPageQuery({ input: { pageId } }))
        needRefetchPage(false)
      }

      return queries
    },
  })

  const initialPropsRef = useRef(JSON.parse(existingProps))
  const tree = useTypeTree(interfaceData?.getTypeGraph)

  if (interfaceLoading) {
    return <Spin />
  }

  if (!interfaceData) {
    return null
  }

  return (
    <div>
      <InterfaceForm
        autosave
        autosaveDelay={500}
        key={elementId}
        interfaceTree={tree}
        model={initialPropsRef.current}
        onSubmit={(data: any) => {
          if (
            hasDataType(
              data,
              [TypeKind.RenderPropsType, TypeKind.ReactNodeType],
              typeKindsById,
            )
          ) {
            if (isPageBuilder) {
              needRefetchPage(true)
            }

            if (isComponentBuilder) {
              needRefetchComponent(true)
            }
          }

          trackPromise(
            mutate({
              variables: {
                input: {
                  elementId,
                  props: JSON.stringify(data),
                },
              },
            }),
          )
        }}
      />
    </div>
  )
}

export interface UpdateElementPropsFormProps {
  elementId: string
  loadingStateKey: string
}

export const UpdateElementPropsForm = ({
  elementId,
  loadingStateKey,
}: UpdateElementPropsFormProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  if (!element.atom) {
    return <>Add an atom to this element to update its props</>
  }

  return (
    <ElementIdProvider elementId={element.id}>
      <UpdateElementPropsFormInternal
        interfaceId={element.atom.api.id}
        elementId={element.id}
        existingProps={element.props}
        loadingStateKey={loadingStateKey}
      />
    </ElementIdProvider>
  )
}
