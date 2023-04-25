import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '../../../sections'

interface SidebarNavigation {
  appId: string
  pageId: string
}

export const sidebarNavigation = ({ appId, pageId }: SidebarNavigation) => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appId),
    pageBuilderMenuItem(appId, pageId),
    resourceMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
