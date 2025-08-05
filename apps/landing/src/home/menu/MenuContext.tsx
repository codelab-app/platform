'use client'

import type { PropsWithChildren } from 'react'

import { createContext, useContext, useState } from 'react'

interface MenuContextType {
  isMenuOpen: boolean
  setMenuOpen(open: boolean): void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ isMenuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuState = () => {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error('useMenuState must be used within a MenuProvider')
  }

  return context
}
