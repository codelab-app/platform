import { Cui } from '@codelab/frontend-application-shared-data'
import React from 'react'
import { CuiSkeletonWrapper } from '../../components'

export interface CuiCollapsePanelContentProps {
  content: React.ReactNode
  isLoading?: boolean
  label: string
}

export const CuiCollapsePanelContent = ({
  content,
  isLoading = false,
  label,
}: CuiCollapsePanelContentProps) => {
  return (
    <div
      className="flex size-full min-h-1/3 flex-col overflow-auto bg-white"
      data-cy={Cui.cuiSidebarViewContent(label)}
    >
      <div className="w-full flex-1 overflow-auto">
        <CuiSkeletonWrapper isLoading={isLoading}>{content}</CuiSkeletonWrapper>
      </div>
    </div>
  )
}
