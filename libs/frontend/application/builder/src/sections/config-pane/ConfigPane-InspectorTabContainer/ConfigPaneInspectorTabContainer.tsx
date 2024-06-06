import CodeOutlined from '@ant-design/icons/CodeOutlined'
import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import FileOutlined from '@ant-design/icons/FileOutlined'
import FormatPainterOutlined from '@ant-design/icons/FormatPainterOutlined'
import NodeIndexOutlined from '@ant-design/icons/NodeIndexOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import {
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import { isAtomRef } from '@codelab/frontend/abstract/domain'
import { UpdateComponentForm } from '@codelab/frontend-application-component/use-cases/update-component'
import { UpdateComponentPropsForm } from '@codelab/frontend-application-component/use-cases/update-component-props'
import { DeleteElementButton } from '@codelab/frontend-application-element/use-cases/delete-element'
import { MoveElementForm } from '@codelab/frontend-application-element/use-cases/move-element'
import { UpdateElementForm } from '@codelab/frontend-application-element/use-cases/update-element'
import { UpdateElementPropsForm } from '@codelab/frontend-application-element/use-cases/update-element-props'
import { UpdatePageTabForm } from '@codelab/frontend-application-page/use-cases/update-page-tab'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ElementCssEditor } from '@codelab/frontend-presentation-components-css-editor'
import { FormContextProvider } from '@codelab/frontend-presentation-view/components/form'
import { Tabs, Tooltip } from 'antd'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React from 'react'
import { PropsInspectorTab } from '../PropsInspectorTab'
import { TabContainer } from './ConfigPaneInspectorTabContainerStyle'
import { TAB_NAMES } from './data'

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

export const ConfigPaneInspectorTabContainer = observer(() => {
  const { appService, builderService, elementService, rendererService } =
    useStore()

  const elementTree = rendererService.activeElementTree
  const selectedNode = builderService.selectedNode?.current
  const activeRenderer = rendererService.activeRenderer?.maybeCurrent

  if (!selectedNode || isRuntimePage(selectedNode)) {
    return null
  }

  const tabItems = [
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
      ) : isNil(selectedNode.childMapperIndex) ? (
        <UpdateComponentForm runtimeComponent={selectedNode} />
      ) : (
        'Child Mapper Component Props cannot be edited'
      ),
      key: TAB_NAMES.Node,
      label: (
        <TooltipIcon icon={<NodeIndexOutlined />} title={TAB_NAMES.Node} />
      ),
    },
    {
      children: (
        <div key={selectedNode.compositeKey}>
          {isRuntimeElement(selectedNode) ? (
            <UpdateElementPropsForm runtimeElement={selectedNode} />
          ) : isRuntimeComponent(selectedNode) ? (
            <UpdateComponentPropsForm runtimeComponent={selectedNode} />
          ) : (
            'Add an atom or a component to this element to edit its props'
          )}
        </div>
      ),
      key: TAB_NAMES.Props,
      label: (
        <TooltipIcon
          icon={
            <SettingOutlined
              style={
                isRuntimeElement(selectedNode) &&
                elementService.validationService.propsHaveErrors(
                  selectedNode.element.current,
                )
                  ? { color: 'red' }
                  : {}
              }
            />
          }
          title={TAB_NAMES.Props}
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
      key: TAB_NAMES.CSS,
      label: (
        <TooltipIcon icon={<FormatPainterOutlined />} title={TAB_NAMES.CSS} />
      ),
    },
    {
      children: !isRuntimePage(selectedNode) && (
        <PropsInspectorTab
          key={selectedNode.compositeKey}
          runtimeNode={selectedNode}
        />
      ),
      key: TAB_NAMES.PropsInspector,
      label: (
        <TooltipIcon icon={<CodeOutlined />} title={TAB_NAMES.PropsInspector} />
      ),
    },
    ...(activeRenderer?.runtimePage
      ? [
          {
            children: (
              <UpdatePageTabForm
                appService={appService}
                key={selectedNode.compositeKey}
              />
            ),
            key: TAB_NAMES.Page,
            label: (
              <TooltipIcon icon={<FileOutlined />} title={TAB_NAMES.Page} />
            ),
          },
        ]
      : []),
    ...(activeRenderer?.runtimeComponent
      ? [
          {
            children: (
              <>
                <UpdateComponentForm
                  runtimeComponent={activeRenderer.runtimeComponent}
                />
                <UpdateComponentPropsForm
                  runtimeComponent={activeRenderer.runtimeComponent}
                />
              </>
            ),
            key: TAB_NAMES.Component,
            label: (
              <TooltipIcon
                icon={<CodeSandboxOutlined />}
                title={TAB_NAMES.Component}
              />
            ),
          },
        ]
      : []),
  ]

  return (
    <FormContextProvider value={{ elementTree, selectedNode }}>
      <TabContainer>
        <Tabs
          defaultActiveKey={TAB_NAMES.Node}
          destroyInactiveTabPane
          items={tabItems}
          size="small"
        />
      </TabContainer>
    </FormContextProvider>
  )
})

ConfigPaneInspectorTabContainer.displayName = 'MetaPaneTabContainer'
