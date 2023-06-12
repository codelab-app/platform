import { Skeleton } from 'antd'
import React from 'react'

interface CuiSkeletonWrapperProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const CuiSkeletonWrapper = ({
  children,
  isLoading,
}: CuiSkeletonWrapperProps) =>
  isLoading ? (
    <div data-cy="codelabui-skeleton">
      <Skeleton active loading style={{ padding: 5 }} />
    </div>
  ) : (
    <>{children}</>
  )
