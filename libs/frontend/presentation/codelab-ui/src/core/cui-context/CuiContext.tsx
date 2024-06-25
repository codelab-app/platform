import { createContext } from 'react'
import {
  cuiPopoverStore,
  type IPopoverStore,
} from '../../layout/CuiSidebarPopover'

export interface ICuiContext {
  popover: IPopoverStore
}

export const CuiContext = createContext<ICuiContext>({
  popover: cuiPopoverStore,
})
