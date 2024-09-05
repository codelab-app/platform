import type { UrlPathParams } from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  authGuardMenuItem,
  builderComponentsMenuItem,
  resourceMenuItem,
} from '../../../sections'
import { pageBuilderMenuItem } from '../../../sections/Menu/BuilderMenuItem'

/**
 * There are 3 cases here,
 *
 * 1) `appId | pageId`
 * 2) `componentId`
 * 3) or none
 *
 * But these params don't affect the existence of menu items, only their status (disabled)
 */
export const defaultNavigationBarItems = ({
  appId,
  componentId,
  pageId,
}: Partial<UrlPathParams>): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem({ appId, pageId }),
    pageBuilderMenuItem({ appId, componentId, pageId }),
    builderComponentsMenuItem({ appId, componentId, pageId }),
    resourceMenuItem,
    authGuardMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
