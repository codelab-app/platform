import {
  CodeOutlined,
  FileOutlined,
  FormatPainterOutlined,
  FunctionOutlined,
  NodeIndexOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  isAtomInstance,
  isComponentPageNodeRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import {
  UpdateComponentForm,
  UpdateComponentPropsForm,
} from '@codelab/frontend/domain/component'
import {
  DeleteElementButton,
  ElementCssEditor,
  MoveElementForm,
  UpdateElementForm,
  UpdateElementPropsForm,
  UpdateElementPropTransformationForm,
} from '@codelab/frontend/domain/element'
import { UpdatePageTabForm } from '@codelab/frontend/domain/page'
import { useStore } from '@codelab/frontend/presentation/container'
import { FormContextProvider } from '@codelab/frontend/presentation/view'
import { css } from '@emotion/react'
import { Tabs, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React from 'react'
import tw from 'twin.macro'
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
      css={css`
        &.anticon {
          ${tw`!mr-0 p-0 h-full flex items-center`}
        }
      `}
      title={title}
    >
      {icon}
    </Tooltip>
  )
}

export const ConfigPaneInspectorTabContainer = observer(() => {
  const { builderService, elementService, pageService } = useStore()
  const elementTree = builderService.activeElementTree
  const selectedNode = builderService.selectedNode

  if (!selectedNode) {
    return null
  }

  const store = elementTree?.rootElement.current.store.current
  const autocomplete = store?.state || {}

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
            css={tw`my-3`}
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
          {isElementPageNodeRef(selectedNode) &&
          selectedNode.current.renderType ? (
            <FormContextProvider
              value={{ allowExpressions: true, autocomplete, elementTree }}
            >
              <UpdateElementPropsForm element={selectedNode} />
            </FormContextProvider>
          ) : isComponentPageNodeRef(selectedNode) ? (
            <UpdateComponentPropsForm component={selectedNode.current} />
          ) : (
            `Add an atom or a component to this element to edit its props`
          )}
        </div>
      ),
      key: TAB_NAMES.Props,
      label: <TooltipIcon icon={<SettingOutlined />} title={TAB_NAMES.Props} />,
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
      children: isElementPageNodeRef(selectedNode) ? (
        <UpdateElementPropTransformationForm
          element={selectedNode.current}
          elementService={elementService}
          key={selectedNode.id}
        />
      ) : null,
      key: TAB_NAMES.PropsTransformation,
      label: (
        <TooltipIcon
          icon={<FunctionOutlined />}
          title={TAB_NAMES.PropsTransformation}
        />
      ),
    },
    {
      children: (
        <FormContextProvider
          value={{
            autocomplete,
            elementTree,
          }}
        >
          <UpdatePageTabForm key={selectedNode.id} pageService={pageService} />
        </FormContextProvider>
      ),
      key: TAB_NAMES.Page,
      label: <TooltipIcon icon={<FileOutlined />} title={TAB_NAMES.Page} />,
    },
  ]

  return (
    <TabContainer>
      <Tabs
        defaultActiveKey={TAB_NAMES.Node}
        destroyInactiveTabPane
        items={tabItems}
        size="small"
      />
    </TabContainer>
  )
})

ConfigPaneInspectorTabContainer.displayName = 'MetaPaneTabContainer'
