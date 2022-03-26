import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { WithActionService } from '../store'
import { CreateActionButton } from '../use-cases'

export const ActionPageHeader = observer<WithActionService>(
  ({ actionService }) => {
    const pageHeaderButtons = [
      <div
        css={tw`flex flex-row items-center justify-center gap-2`}
        key="export_import"
      >
        <CreateActionButton actionService={actionService} key="create" />
      </div>,
    ]

    return (
      <PageHeader extra={pageHeaderButtons} ghost={false} title="Actions" />
    )
  },
)
