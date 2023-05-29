import type { CodelabUIHeaderToolbarCommands } from './header-toolbar'
import type { CodelabUISidebarCommands } from './sidebar'
import type { CodelabUISkeletonCommands } from './skeleton'
import type { CodelabUIToolbarCommands } from './toolbar'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends CodelabUIHeaderToolbarCommands,
        CodelabUISidebarCommands,
        CodelabUIToolbarCommands,
        CodelabUISkeletonCommands {}
  }
}
