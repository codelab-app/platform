import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  builderComponentsMenuItem,
  componentMenuItem,
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
    allPagesMenuItem(appId, pageId),
    builderComponentsMenuItem(appId, pageId),
    pageBuilderMenuItem(appId, pageId),
    resourceMenuItem,
    componentMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
