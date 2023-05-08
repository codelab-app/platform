import type { IApp } from '@codelab/frontend/abstract/core'
import { ExplorerPaneTemplate } from '@codelab/frontend/presentation/view'
import type { Nullish } from '@codelab/shared/abstract/types'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  PageList,
  UpdatePageModal,
} from '../use-cases'

interface ExplorerPanePageProps {
  app: Nullish<IApp>
  loading: boolean
}

export const ExplorerPanePage = observer(
  ({ app, loading }: ExplorerPanePageProps) => {
    return (
      <ExplorerPaneTemplate header={<CreatePageButton key={0} />} title="Pages">
        {loading || !app ? <Spin /> : <PageList app={app} />}

        <CreatePageModal />
        <UpdatePageModal />
        <DeletePageModal />
      </ExplorerPaneTemplate>
    )
  },
)
