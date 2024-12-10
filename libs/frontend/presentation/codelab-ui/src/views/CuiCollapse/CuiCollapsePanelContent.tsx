import { CuiTestId } from '@codelab/frontend-application-shared-data'

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
      className="flex min-h-1/3 grow flex-col overflow-auto bg-white"
      data-testid={CuiTestId.cuiSidebarViewContent(label)}
    >
      <div className="flex-1 overflow-auto">
        <CuiSkeletonWrapper isLoading={isLoading}>{content}</CuiSkeletonWrapper>
      </div>
    </div>
  )
}
