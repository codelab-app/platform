import type { IRouterParam } from '@codelab/frontend/abstract/application'
import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  authGuardMenuItem,
  builderComponentsMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '../../../sections'

export const defaultNavigationBarItems = ({
  appSlug,
  componentSlug,
  pageSlug,
  userSlug,
}: IRouterParam): {
  primaryItems: Array<NavigationBarItem>
  secondaryItems: Array<NavigationBarItem>
} => ({
  primaryItems: [
    appMenuItem,
    allPagesMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    builderComponentsMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    pageBuilderMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    resourceMenuItem,
    authGuardMenuItem,
  ],
  secondaryItems: adminMenuItems,
})
