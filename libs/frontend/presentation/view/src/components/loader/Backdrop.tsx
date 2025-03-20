import type { ReactNode } from 'react'

export const Backdrop = ({
  children,
  opacity = 0.5,
  visible = true,
  zIndex = 1000,
}: {
  children: ReactNode
  opacity?: number
  visible?: boolean
  zIndex?: number
}) => {
  if (!visible) {
    return null
  }

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex,
      }}
    >
      {children}
    </div>
  )
}
