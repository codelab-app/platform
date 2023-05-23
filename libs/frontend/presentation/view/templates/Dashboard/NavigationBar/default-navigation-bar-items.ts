import type { NavigationBarItem } from '@codelab/frontend/presentation//codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  builderComponentsMenuItem,
  componentMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '../../../sections'

interface SidebarNavigationRequirements {
  appId: string
  pageId: string
}

export const defaultNavigationBarItems = ({
  appId,
  pageId,
}: SidebarNavigationRequirements): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appId, pageId),
    builderComponentsMenuItem(appId, pageId),
    pageBuilderMenuItem(appId, pageId),
    resourceMenuItem,
    componentMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
