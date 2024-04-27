import { Skeleton } from 'antd'
import React from 'react'

interface SkeletonWrapperProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const SkeletonWrapper = ({
  children,
  isLoading,
}: SkeletonWrapperProps) =>
  isLoading ? (
    <Skeleton active loading style={{ padding: 5 }} />
  ) : (
    <>{children}</>
  )
