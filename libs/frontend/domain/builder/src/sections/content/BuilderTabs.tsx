import {
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  IRenderService,
  IStore,
  RendererTab,
} from '@codelab/frontend/abstract/core'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { useWindowWidth } from '@react-hook/window-size'
import { Alert, Layout, Spin, Tabs } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { BaseBuilder } from './BaseBuilder'
import { BuilderComponent } from './Builder-Component'

export interface BuilderTabsProps {
  error: Nullish<string>
  isLoading: boolean
  renderer: Maybe<IRenderer>
  builderService: IBuilderService
  elementService: IElementService
  elementTree: Maybe<IElementTree>
  componentService: IComponentService
  appStore: Maybe<IStore>
  builderRenderService: IRenderService
}

export const BuilderTabs = observer<BuilderTabsProps>(
  ({
    error,
    isLoading,
    builderService,
    elementTree,
    elementService,
    renderer,
    appStore,
    componentService,
    builderRenderService,
  }) => {
    const windowWidth = useWindowWidth()
    const builderTabsRef = useRef<HTMLDivElement>(null)
    const [builderTabsWidth, setBuilderTabsWidth] = useState(0)
    useEffect(() => {
      setBuilderTabsWidth(builderTabsRef.current?.clientWidth ?? 0)
    }, [windowWidth])

    return (
      <Layout ref={builderTabsRef} style={{ height: '100%' }}>
        {error && <Alert message={extractErrorMessage(error)} type="error" />}
        {isLoading && <Spin />}
        <Header style={{ background: 'rgba(0,0,0,0)', marginBottom: '5px' }}>
          <Tabs
            activeKey={builderService.activeTree}
            defaultActiveKey={RendererTab.Page}
            onChange={(key) => console.log(key)}
            type="card"
          >
            <Tabs.TabPane key={RendererTab.Page} tab="Page" />
            <Tabs.TabPane key={RendererTab.Component} tab="Component" />
          </Tabs>
        </Header>
        <Content>
          {builderService.activeTree === RendererTab.Page ? (
            elementTree && renderer ? (
              <BaseBuilder
                builderService={builderService}
                builderTabsWidth={builderTabsWidth}
                elementService={elementService}
                elementTree={elementTree}
                renderer={renderer}
              />
            ) : null
          ) : builderService.activeComponent && appStore ? (
            <BuilderComponent
              BaseBuilder={BaseBuilder}
              appStore={appStore}
              builderService={builderService}
              componentId={builderService.activeComponent.id}
              componentService={componentService}
              elementService={elementService}
              renderService={builderRenderService}
            />
          ) : null}
        </Content>
      </Layout>
    )
  },
)
