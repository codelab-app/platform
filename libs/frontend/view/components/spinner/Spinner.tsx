import { Spin } from 'antd'
import React from 'react'

export interface SpinnerProps {
  isLoading: boolean
  children?: React.ReactNode
}

export const Spinner = ({ isLoading, children }: SpinnerProps) =>
  isLoading ? <Spin /> : <>{children}</>
