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
  appName: string
  pageName: string
  userName: string
}

export const defaultNavigationBarItems = ({
  appName,
  pageName,
  userName,
}: SidebarNavigationRequirements): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appName, pageName, userName),
    builderComponentsMenuItem(appName, pageName, userName),
    pageBuilderMenuItem(appName, pageName, userName),
    resourceMenuItem,
    componentMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
