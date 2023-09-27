import { client } from '@codelab/frontend/presentation/client/graphql'
import { getSdk } from './get-page-server-side-props.endpoints.graphql.gen'
import { IEntity } from '@codelab/shared/abstract/types'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { getNameFromSlug } from '@codelab/shared/utils'

const getPageServerSidePropsApi = getSdk(client)

export const getPageServerSideProps = async (
  appSlug: string,
  pageSlug: string,
  user: IEntity,
) => {
  const {
    pages: [page],
  } = await getPageServerSidePropsApi.GetPageServerSideProps({
    appCompositeKey: AppProperties.appCompositeKey(
      getNameFromSlug(appSlug),
      user,
    ),
    // we are using ends_with on pageCompositeKey
    // we are sure that pageName doesn't contain any dash(-)
    // pageCompositeKey has following format [app.id]-[p][pageName]
    // to make sure [p] is empty we add dash(-)
    pageName: `-${getNameFromSlug(pageSlug)}`,
  })

  return page
}
