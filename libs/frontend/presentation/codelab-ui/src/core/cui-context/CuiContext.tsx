import { createContext } from 'react'
import {
  cuiPopoverStore,
  type IPopoverStore,
} from '../../layout/CuiSidebarPopover'

export interface CuiContext {
  popover: IPopoverStore
}

export const CuiContext = createContext<CuiContext>({
  popover: cuiPopoverStore,
})
