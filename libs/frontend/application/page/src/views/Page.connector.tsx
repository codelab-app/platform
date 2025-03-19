'use client'

import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { ComponentType, ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const PageConnector = observer(
  ({ children, id }: { id: string; children(page: IPageModel): ReactNode }) => {
    const { pageDomainService } = useDomainStore()
    const page = pageDomainService.pages.get(id)

    if (!page) {
      return <Spinner />
    }

    return <>{children(page)}</>
  },
)

interface PropsProvidedByHOC {
  page: IPageModel
}

export const withPageConnector = <P extends PropsProvidedByHOC>(
  Component: ComponentType<P>,
) => {
  const WithPageConnector = ({
    pageId,
    ...props
  }: { pageId: string } & Omit<P, keyof PropsProvidedByHOC>) => {
    return (
      <PageConnector id={pageId}>
        {(page) => {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...(props as unknown as P)} page={page} />
        }}
      </PageConnector>
    )
  }

  return WithPageConnector
}
