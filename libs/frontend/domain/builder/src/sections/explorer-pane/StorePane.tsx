import type { IStore } from '@codelab/frontend/abstract/core'
import {
  ActionsTreeView,
  CreateActionButton,
  CreateActionModal,
  DeleteActionModal,
  StateTreeView,
  UpdateActionModal,
} from '@codelab/frontend/domain/store'
import { CreateFieldButton } from '@codelab/frontend/domain/type'
import {
  CodeMirrorEditor,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'

const StoreHeader = ({
  children,
  extra,
}: PropsWithChildren<{ extra?: ReactNode }>) => (
  <div className="flex justify-between">
    <span className="text-sm font-bold">{children}</span>
    <div>{extra}</div>
  </div>
)

export const StorePane = observer<{ store: Maybe<IStore>; isLoading: boolean }>(
  ({ isLoading, store }) => (
    <SkeletonWrapper isLoading={isLoading}>
      {store ? (
        <>
          <Collapse className="mb-2 w-full" defaultActiveKey={['1']} ghost>
            <Collapse.Panel
              header={
                <StoreHeader
                  extra={
                    <CreateFieldButton
                      interfaceId={store.api.id}
                      useModal={false}
                    />
                  }
                >
                  State
                </StoreHeader>
              }
              key="store-state"
            >
              <StateTreeView store={store} />
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <StoreHeader extra={<CreateActionButton />}>
                  Actions
                </StoreHeader>
              }
              key="store-actions"
            >
              <ActionsTreeView store={store} />
            </Collapse.Panel>
            <Collapse.Panel
              header={<StoreHeader>Inspector</StoreHeader>}
              key="store-inspector"
            >
              <CodeMirrorEditor
                className="mt-1"
                language={CodeMirrorLanguage.Json}
                onChange={() => undefined}
                singleLine={false}
                title="Current props"
                value={store.jsonString}
              />
            </Collapse.Panel>
          </Collapse>
          <CreateActionModal store={store} />
          <UpdateActionModal />
          <DeleteActionModal />
        </>
      ) : null}
    </SkeletonWrapper>
  ),
)
