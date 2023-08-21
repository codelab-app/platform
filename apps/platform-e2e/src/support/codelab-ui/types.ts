import type { CodelabUIHeaderToolbarCommands } from './header-toolbar'
import type { CodelabUINavigationBarCommands } from './navigation-bar'
import type { CodelabUIPopoverCommands } from './popover'
import type { CodelabUISidebarCommands } from './sidebar'
import type { CodelabUISkeletonCommands } from './skeleton'
import type { CodelabUIToolbarCommands } from './toolbar'
import type { CodelabUITreeCommands } from './tree'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CodelabUIHeaderToolbarCommands,
        CodelabUISidebarCommands,
        CodelabUIToolbarCommands,
        CodelabUISkeletonCommands,
        CodelabUINavigationBarCommands,
        CodelabUIPopoverCommands,
        CodelabUITreeCommands {}
  }
}
