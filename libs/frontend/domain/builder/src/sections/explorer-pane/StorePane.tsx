import type { IStore } from '@codelab/frontend/abstract/core'
import {
  ActionsList,
  CreateActionButton,
  GetStateList,
} from '@codelab/frontend/domain/store'
import { CreateFieldButton } from '@codelab/frontend/domain/type'
import {
  CodeMirrorEditor,
  SkeletonWrapper,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import { css } from '@emotion/react'
import { Collapse } from 'antd'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'

const StoreHeader = ({
  children,
  extra,
}: PropsWithChildren<{ extra?: ReactNode }>) => (
  <div css={tw`flex justify-between`}>
    <span css={tw`text-sm font-bold`}>{children}</span>
    <div>{extra}</div>
  </div>
)

export const StorePane = observer<{ store: Maybe<IStore>; isLoading: boolean }>(
  ({ isLoading, store }) => (
    <SkeletonWrapper isLoading={isLoading}>
      {store ? (
        <Collapse css={tw`w-full mb-2`} defaultActiveKey={['1']} ghost>
          <Collapse.Panel
            header={
              <StoreHeader
                extra={<CreateFieldButton interfaceId={store.api.id} />}
              >
                State
              </StoreHeader>
            }
            key="store-state"
          >
            <GetStateList store={store} />
          </Collapse.Panel>
          <Collapse.Panel
            header={
              <StoreHeader extra={<CreateActionButton />}>Actions</StoreHeader>
            }
            key="store-actions"
          >
            <ActionsList store={store} />
          </Collapse.Panel>
          <Collapse.Panel
            header={<StoreHeader>Inspector</StoreHeader>}
            key="store-inspector"
          >
            <CodeMirrorEditor
              language={CodeMirrorLanguage.Json}
              onChange={() => undefined}
              overrideStyles={css`
                ${tw`mt-1`}
              `}
              singleLine={false}
              title="Current props"
              value={store.jsonString}
            />
          </Collapse.Panel>
        </Collapse>
      ) : null}
    </SkeletonWrapper>
  ),
)
