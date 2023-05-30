import type { GetRenderedPageAndCommonAppDataQuery } from '@codelab/shared/abstract/codegen'

export interface ProductionWebsiteProps {
  appName: string
  pageName: string
  renderingData: GetRenderedPageAndCommonAppDataQuery
}
