import type { GetProductionPageQuery } from '@codelab/shared/abstract/codegen'

/**
 * For production user websites we use slightly different flow:
 *
 * - we prebuild pages with all required information to avoid requests to platform DB
 * - pageName and appName are not exposed in url, so we need to pass them explicitly
 */
export interface ProductionWebsiteProps {
  appName: string
  pageName: string
  renderingData: GetProductionPageQuery
}
