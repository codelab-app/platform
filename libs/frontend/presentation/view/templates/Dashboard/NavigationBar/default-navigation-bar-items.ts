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
  appSlug: string
  pageSlug: string
  userName: string
}

export const defaultNavigationBarItems = ({
  appSlug,
  pageSlug,
  userName,
}: SidebarNavigationRequirements): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appSlug, pageSlug, userName),
    builderComponentsMenuItem(appSlug, pageSlug, userName),
    pageBuilderMenuItem(appSlug, pageSlug, userName),
    resourceMenuItem,
    componentMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
