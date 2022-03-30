import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  BuilderDashboardTemplate,
  BuilderOld,
  BuilderSidebarNavigation,
  MainPaneBuilder,
  MetaPaneBuilderComponent,
} from '@codelab/frontend/modules/builder'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const ComponentDetail: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useStore()
  // const { elementTree } = useElementGraphContext()

  // if (!elementTree) {
  //   return <Empty />
  // }
  //
  // const root = elementTree.getRootVertex(ElementTree.isComponent)

  return (
    <>
      <Head>{/* <title>{root?.component?.name} | Codelab</title>*/}</Head>

      <BuilderOld
        isComponentBuilder
        // tree={elementTree}
        typeService={store.typeService}
      />
    </>
  )
})

const ComponentElementGraphProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const componentId = query.componentId as string

  // const { data, isLoading } = useGetComponentsQuery({
  //   variables: { where: { id: componentId } },
  // })

  // const rootElementId = data?.components[0]?.rootElement.id

  // if (!rootElementId) {
  //   return null
  // }

  return null
  // return (
  // <SpinnerWrapper isLoading={isLoading}>
  // <ElementGraphProvider elementId={rootElementId}>
  // {children}
  // </ElementGraphProvider>*
  // </SpinnerWrapper>
  // )
}

export default ComponentDetail

export const getServerSideProps = withPageAuthRequired()

ComponentDetail.Layout = observer((page) => {
  const store = useStore()

  return (
    <BuilderContext
      builderService={store.builderService}
      elementService={store.elementService}
    >
      <BuilderDashboardTemplate
        MainPane={observer(() => (
          <MainPaneBuilder
            atomService={store.atomService}
            builderService={store.builderService}
            componentService={store.componentService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        ))}
        MetaPane={observer(() => (
          <MetaPaneBuilderComponent
            atomService={store.atomService}
            builderService={store.builderService}
            elementService={store.elementService}
            key={store.builderService.builderRenderer.tree?.root?.id}
            typeService={store.typeService}
          />
        ))}
        SidebarNavigation={observer((props) => (
          <BuilderSidebarNavigation
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            builderService={store.builderService}
            key={store.builderService.builderRenderer.tree?.root?.id}
          />
        ))}
        builderService={store.builderService}
      >
        {page.children}
      </BuilderDashboardTemplate>
    </BuilderContext>
  )
})

export default ComponentDetail
