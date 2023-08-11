import type { GetRenderedPageAndAppDataQuery } from '@codelab/shared/abstract/codegen'

export interface ProductionWebsiteProps {
  appName: string
  pageName: string
  renderingData: GetRenderedPageAndAppDataQuery
}
