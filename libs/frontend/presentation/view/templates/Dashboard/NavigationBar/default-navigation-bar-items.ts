import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  builderComponentsMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '../../../sections'

interface SidebarNavigationRequirements {
  appSlug: string
  componentSlug: string
  pageSlug: string
  userSlug: string
}

export const defaultNavigationBarItems = ({
  appSlug,
  componentSlug,
  pageSlug,
  userSlug,
}: SidebarNavigationRequirements): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    builderComponentsMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    pageBuilderMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    resourceMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
