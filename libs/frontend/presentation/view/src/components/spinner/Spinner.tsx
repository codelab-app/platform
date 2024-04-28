import { Spin } from 'antd'
import React from 'react'

export interface SpinnerProps {
  center?: boolean
  children?: React.ReactNode
  isLoading: boolean
}

export const Spinner = ({ center, children, isLoading }: SpinnerProps) => {
  const style: React.CSSProperties = {}

  if (center) {
    style.left = '50%'
    style.position = 'absolute'
    style.top = '50%'
    style.transform = 'translate(-50%, -50%)'
  }

  return isLoading ? <Spin style={style} /> : <>{children}</>
}
