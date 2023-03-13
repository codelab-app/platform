import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'

export interface AppPagePageProps {
  appId: string
  pageId: string
  renderingData: GetRenderedPageAndCommonAppDataQuery
}
