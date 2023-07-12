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
  componentSlug: string
  pageSlug: string
  userName: string
}

export const defaultNavigationBarItems = ({
  appSlug,
  componentSlug,
  pageSlug,
  userName,
}: SidebarNavigationRequirements): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appSlug, pageSlug, componentSlug, userName),
    builderComponentsMenuItem(appSlug, pageSlug, componentSlug, userName),
    pageBuilderMenuItem(appSlug, pageSlug, componentSlug, userName),
    resourceMenuItem,
    componentMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
