import type { ButtonProps } from 'antd'
import type { PropsWithChildren } from 'react'

import { createContext, useContext, useState } from 'react'

interface DemoCardProps {
  block: boolean
  icon: string
  type: ButtonProps['type']
}

interface DemoContextType {
  demoCardProp: DemoCardProps
  setDemoCardProp(props: DemoCardProps): void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export const DemoProvider = ({ children }: PropsWithChildren) => {
  const [demoCardProp, setDemoCardProp] = useState<DemoCardProps>({
    block: true,
    icon: 'shopping-outlined',
    type: 'primary',
  })

  return (
    <DemoContext.Provider value={{ demoCardProp, setDemoCardProp }}>
      {children}
    </DemoContext.Provider>
  )
}

export const useDemoState = () => {
  const context = useContext(DemoContext)

  if (!context) {
    throw new Error('useDemoState must be used within a DemoProvider')
  }

  return context
}
