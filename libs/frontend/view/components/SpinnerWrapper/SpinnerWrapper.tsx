import { Spin } from 'antd'
import React from 'react'

export type SpinnerWrapperProps = {
  isLoading: boolean
  children?: React.ReactNode
}

export const SpinnerWrapper = ({ isLoading, children }: SpinnerWrapperProps) =>
  isLoading ? <Spin /> : <>{children}</>
