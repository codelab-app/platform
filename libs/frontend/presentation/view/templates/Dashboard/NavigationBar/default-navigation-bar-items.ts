import type { IRouterPath } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  builderComponentsMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '../../../sections'

export const defaultNavigationBarItems = ({
  appSlug,
  componentSlug,
  pageSlug,
  userSlug,
}: IRouterPath): {
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
