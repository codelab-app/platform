'use client'

import CodeOutlined from '@ant-design/icons/CodeOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import FileOutlined from '@ant-design/icons/FileOutlined'
import FormatPainterOutlined from '@ant-design/icons/FormatPainterOutlined'
import NodeIndexOutlined from '@ant-design/icons/NodeIndexOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import {
  type IBuilderRoute,
  type IRendererModel,
  type IRuntimeComponentModel,
  type IRuntimeElementModel,
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import { type IElementTree, isAtomRef } from '@codelab/frontend/abstract/domain'
import { UpdateComponentForm } from '@codelab/frontend-application-component/use-cases/update-component'
import { UpdateComponentPropsForm } from '@codelab/frontend-application-component/use-cases/update-component-props'
import { DeleteElementButton } from '@codelab/frontend-application-element/use-cases/delete-element'
import { MoveElementForm } from '@codelab/frontend-application-element/use-cases/move-element'
import { UpdateElementForm } from '@codelab/frontend-application-element/use-cases/update-element'
import { UpdateElementPropsForm } from '@codelab/frontend-application-element/use-cases/update-element-props'
import { UpdatePageTabForm } from '@codelab/frontend-application-page/use-cases/update-page-tab'
import { usePreferenceService } from '@codelab/frontend-application-preference/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ElementCssEditor } from '@codelab/frontend-presentation-components-css-editor'
import { FormContextProvider } from '@codelab/frontend-presentation-components-form'
import { IConfigPaneTab } from '@codelab/shared/abstract/core'
import { Tabs, Tooltip } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { type ReactNode, useMemo } from 'react'
import { isNullish } from 'remeda'

import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabGroup } from './ConfigPaneInspectorTabGroupStyle'
import { getTabTitle } from './data'

interface TooltipIconProps {
  icon: ReactNode
  title: string
}

export const TooltipIcon = ({ icon, title }: TooltipIconProps) => {
  return (
    <Tooltip
      className={classNames(
        '[&_.anticon]:!mr-0',
        '[&_.anticon]:flex',
        '[&_.anticon]:h-full',
        '[&_.anticon]:items-center',
        '[&_.anticon]:p-0',
      )}
      title={title}
    >
      {icon}
    </Tooltip>
  )
}

/**
 * Issue with observer here, since `page` sets selectedNode, which will trigger update here. But we get `Cannot update a component (`MetaPaneTabContainer`) while rendering a different component (`Builder`)`
 */
export const ConfigPaneInspectorTabGroup = observer<{
  selectedNode: IRuntimeComponentModel | IRuntimeElementModel
  activeRenderer: IRendererModel
  elementTree: IElementTree
  context: IBuilderRoute
}>(({ activeRenderer, context, elementTree, selectedNode }) => {
  const { userDomainService } = useDomainStore()
  const { update } = usePreferenceService()
  const preference = userDomainService.preference

  console.log(selectedNode.compositeKey)

  // Nested components render too many times if we don't memo
  const tabItems = useMemo(
    () => [
      {
        children: isRuntimeElement(selectedNode) ? (
          <>
            <UpdateElementForm
              key={`${selectedNode.compositeKey}_update_form`}
              runtimeElement={selectedNode}
            />
            <MoveElementForm
              key={`${selectedNode.compositeKey}_move_form`}
              runtimeElement={selectedNode}
            />
            <DeleteElementButton
              className="my-3"
              disabled={selectedNode.element.current.isRoot}
              runtimeElement={selectedNode}
            />
          </>
        ) : isNullish(selectedNode.childMapperIndex) ? (
          <UpdateComponentForm runtimeComponent={selectedNode} />
        ) : (
          'Child Mapper Component Props cannot be edited'
        ),
        key: IConfigPaneTab.Node,
        label: (
          <TooltipIcon
            icon={<NodeIndexOutlined />}
            title={getTabTitle(IConfigPaneTab.Node)}
          />
        ),
      },
      {
        children: (
          <div key={selectedNode.compositeKey}>
            {isRuntimeElement(selectedNode) ? (
              <UpdateElementPropsForm
                context={context}
                runtimeElement={selectedNode}
              />
            ) : isRuntimeComponent(selectedNode) ? (
              <UpdateComponentPropsForm
                context={context}
                runtimeComponent={selectedNode}
              />
            ) : (
              'Add an atom or a component to this element to edit its props'
            )}
          </div>
        ),
        key: IConfigPaneTab.Props,
        label: (
          <TooltipIcon
            icon={
              <SettingOutlined
                style={
                  isRuntimeElement(selectedNode) && selectedNode.propsHaveErrors
                    ? { color: 'red' }
                    : {}
                }
              />
            }
            title={getTabTitle(IConfigPaneTab.Props)}
          />
        ),
      },
      {
        children:
          isRuntimeElement(selectedNode) &&
          isAtomRef(selectedNode.element.current.renderType) ? (
            <ElementCssEditor
              key={selectedNode.compositeKey}
              runtimeElement={selectedNode}
            />
          ) : (
            'Add an atom to this page element to edit its CSS'
          ),
        key: IConfigPaneTab.Css,
        label: (
          <TooltipIcon
            icon={<FormatPainterOutlined />}
            title={getTabTitle(IConfigPaneTab.Css)}
          />
        ),
      },
      {
        children: !isRuntimePage(selectedNode) && (
          <PropsInspectorTab
            key={selectedNode.compositeKey}
            runtimeNode={selectedNode}
          />
        ),
        key: IConfigPaneTab.PropsInspector,
        label: (
          <TooltipIcon
            icon={<CodeOutlined />}
            title={getTabTitle(IConfigPaneTab.PropsInspector)}
          />
        ),
      },
      ...(activeRenderer.runtimePage
        ? [
            {
              children: (
                <UpdatePageTabForm
                  key={selectedNode.compositeKey}
                  page={activeRenderer.runtimePage.page.current}
                />
              ),
              key: IConfigPaneTab.Page,
              label: (
                <TooltipIcon
                  icon={<FileOutlined />}
                  title={getTabTitle(IConfigPaneTab.Page)}
                />
              ),
            },
          ]
        : []),
      ...(activeRenderer.runtimeComponent
        ? [
            {
              children: (
                <>
                  <UpdateComponentForm
                    runtimeComponent={activeRenderer.runtimeComponent}
                  />
                  <UpdateComponentPropsForm
                    context={context}
                    runtimeComponent={activeRenderer.runtimeComponent}
                  />
                </>
              ),
              key: IConfigPaneTab.Component,
              label: (
                <TooltipIcon
                  icon={<CodeSandboxOutlined />}
                  title={getTabTitle(IConfigPaneTab.Component)}
                />
              ),
            },
          ]
        : []),
    ],
    [activeRenderer.runtimeComponent, activeRenderer.runtimePage, selectedNode],
  )

  return (
    <FormContextProvider value={{ elementTree, selectedNode }}>
      <TabGroup>
        <Tabs
          activeKey={preference.activeConfigPaneTab}
          // destroyInactiveTabPane
          items={tabItems}
          onChange={(activeKey) =>
            void update({
              activeConfigPaneTab: activeKey as IConfigPaneTab,
              id: preference.id,
            })
          }
          size="small"
        />
      </TabGroup>
    </FormContextProvider>
  )
})

ConfigPaneInspectorTabGroup.displayName = 'MetaPaneTabContainer'
