import {
  CodeOutlined,
  FileOutlined,
  FormatPainterOutlined,
  NodeIndexOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  isAtomInstance,
  isComponentPageNodeRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/domain'
import {
  UpdateComponentForm,
  UpdateComponentPropsForm,
} from '@codelab/frontend/application/component'
import {
  DeleteElementButton,
  ElementCssEditor,
  MoveElementForm,
  UpdateElementForm,
  UpdateElementPropsForm,
} from '@codelab/frontend/application/element'
import { UpdatePageTabForm } from '@codelab/frontend/application/page'
import { useStore } from '@codelab/frontend/application/shared/store'
import { FormContextProvider } from '@codelab/frontend/presentation/view'
import { Tabs, Tooltip } from 'antd'
import classNames from 'classnames'
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

const TooltipIcon = ({ icon, title }: TooltipIconProps) => {
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
  const {
    builderService,
    elementApplicationService,
    elementService,
    pageService,
  } = useStore()

  const elementTree = builderService.activeElementTree
  const selectedNode = builderService.selectedNode

  if (!selectedNode) {
    return null
  }

  const element = elementTree?.element(selectedNode.id || '')

  const tabItems = [
    {
      children: isElementPageNodeRef(selectedNode) ? (
        <>
          <UpdateElementForm
            element={selectedNode.current}
            key={selectedNode.id + '_update_form'}
          />
          <MoveElementForm
            element={selectedNode.current}
            key={selectedNode.id + '_move_form'}
          />
          <DeleteElementButton
            className="my-3"
            disabled={selectedNode.current.isRoot}
            element={selectedNode.current}
          />
        </>
      ) : (
        <UpdateComponentForm component={selectedNode.current} />
      ),
      key: TAB_NAMES.Node,
      label: (
        <TooltipIcon icon={<NodeIndexOutlined />} title={TAB_NAMES.Node} />
      ),
    },
    {
      children: (
        <div key={selectedNode.id}>
          {isElementPageNodeRef(selectedNode) ? (
            <UpdateElementPropsForm element={selectedNode} />
          ) : isComponentPageNodeRef(selectedNode) ? (
            <UpdateComponentPropsForm component={selectedNode.current} />
          ) : (
            `Add an atom or a component to this element to edit its props`
          )}
        </div>
      ),
      key: TAB_NAMES.Props,
      label: (
        <TooltipIcon
          icon={
            <SettingOutlined
              style={
                elementApplicationService.validationService.propsHaveErrors(
                  element,
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
        isElementPageNodeRef(selectedNode) &&
        isAtomInstance(selectedNode.current.renderType) ? (
          <ElementCssEditor
            element={selectedNode.current}
            elementService={elementService}
            key={selectedNode.id}
          />
        ) : (
          `Add an atom to this page element to edit its CSS`
        ),
      key: TAB_NAMES.CSS,
      label: (
        <TooltipIcon icon={<FormatPainterOutlined />} title={TAB_NAMES.CSS} />
      ),
    },
    {
      children: <PropsInspectorTab key={selectedNode.id} node={selectedNode} />,
      key: TAB_NAMES.PropsInspector,
      label: (
        <TooltipIcon icon={<CodeOutlined />} title={TAB_NAMES.PropsInspector} />
      ),
    },
    {
      children: (
        <UpdatePageTabForm key={selectedNode.id} pageService={pageService} />
      ),
      key: TAB_NAMES.Page,
      label: <TooltipIcon icon={<FileOutlined />} title={TAB_NAMES.Page} />,
    },
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
