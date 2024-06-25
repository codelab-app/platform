import { CY_DATA } from '@codelab/frontend-application-shared-data'
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
  <div className="size-full">
    <div
      className={`size-full ${isLoading ? 'block' : 'hidden'}`}
      data-cy={CY_DATA.cuiSkeleton().cyData}
    >
      <Skeleton active loading style={{ padding: 5 }} />
    </div>
    <div className={`size-full ${isLoading ? 'hidden' : 'block'}`}>
      {children}
    </div>
  </div>
)
