import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'

export interface AppPagePageProps {
  pageId: string
  appId: string
  renderingData?: GetRenderedPageAndCommonAppDataQuery
}
