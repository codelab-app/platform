import type { Metadata } from 'next'

import { ContentSection } from '@codelab/frontend-presentation-view/sections'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

// export const dynamic = 'force-dynamic'

const AppsRoute = async () => {
  // const user = await getServerUser()

  // const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
  //   appRepository.findPreview({ owner: { id: user.id } }),
  //   defaultAtomQuery(),
  // ])

  return (
    <ContentSection>
      {/* <DomainStoreHydrator
        appsDto={appsDto}
        atomsDto={atomsDto}
        fallback={<Spinner />}
        pagesDto={appsDto.flatMap((app) => app.pages)}
      >
        <CreateAppModal />
        <DeleteAppModal />
        <UpdateAppModal />
        <BuildAppModal />

        <AppListContainer />
      </DomainStoreHydrator> */}
    </ContentSection>
  )
}

export default AppsRoute
