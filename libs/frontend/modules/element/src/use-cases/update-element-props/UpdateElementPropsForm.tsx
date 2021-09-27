// TODO: restucture module page to get rid of this error later
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  PageContext,
  refetchGetPageQuery,
} from '@codelab/frontend/modules/page'
import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { usePromisesLoadingIndicator } from '@codelab/frontend/view/components'
import {
  REACT_NODE_PROPS_ACCESSOR,
  RENDER_PROPS_ACCESSOR,
} from '@codelab/shared/constants'
import { Spin } from 'antd'
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

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  loadingStateKey,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)
  const [isRefetchPage, needRefetchPage] = React.useState(false)

  const { data: interfaceData, loading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const { pageId } = useContext(PageContext)

  const [mutate] = useUpdateElementPropsMutation({
    refetchQueries: () => {
      const queries: Array<any> = [
        refetchGetElementQuery({ input: { elementId } }),
      ]

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
          if (data[RENDER_PROPS_ACCESSOR] || data[REACT_NODE_PROPS_ACCESSOR]) {
            // fetch component for new render props...
            needRefetchPage(true)
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
