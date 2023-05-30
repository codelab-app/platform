import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'

export interface ProductionWebsiteProps {
  appId: string
  pageName: string
  renderingData: GetRenderedPageAndCommonAppDataQuery
}
