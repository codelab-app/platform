import { Spin } from 'antd'
import React from 'react'

export interface SpinnerProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const Spinner = ({ children, isLoading }: SpinnerProps) =>
  isLoading ? <Spin /> : <>{children}</>
