import { CY_DATA } from '@codelab/frontend/abstract/testing'
import { Skeleton } from 'antd'
import React from 'react'

interface CuiSkeletonWrapperProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const CuiSkeletonWrapper = ({
  children,
  isLoading,
}: CuiSkeletonWrapperProps) => (
  <div className="h-full w-full">
    <div
      className={`h-full w-full ${isLoading ? 'block' : 'hidden'}`}
      data-cy={CY_DATA.cuiSkeleton()}
    >
      <Skeleton active loading style={{ padding: 5 }} />
    </div>
    <div className={`h-full w-full ${isLoading ? 'hidden' : 'block'}`}>
      {children}
    </div>
  </div>
)
