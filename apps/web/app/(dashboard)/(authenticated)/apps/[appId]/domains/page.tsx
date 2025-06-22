import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { DomainListContainer } from '@codelab/frontend-application-domain/use-cases/domain-list'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  // description: '...',
  title: 'Domains | Codelab',
}

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

  return (
    <ContentSection>
      <DomainListContainer appId={appId} />
    </ContentSection>
  )
}

export default Page
