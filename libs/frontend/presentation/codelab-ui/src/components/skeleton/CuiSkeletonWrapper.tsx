import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Skeleton } from 'antd'
import { clsx } from 'clsx'

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
      className={clsx(
        'size-full',
        isLoading ? 'block' : 'hidden',
        CuiTestId.cuiSkeleton(),
      )}
      data-testid={CuiTestId.cuiSkeleton()}
    >
      <Skeleton active loading style={{ padding: 5 }} />
    </div>
    <div className={`size-full ${isLoading ? 'hidden' : 'block'}`}>
      {children}
    </div>
  </div>
)
