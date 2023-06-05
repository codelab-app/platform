export const TREE_NODE_SELECTOR = '.ant-tree-treenode'
export const TREE_ITEM_TOOLBAR_SELECTOR = '.codelabui-tree-item-toolbar'
export const TREE_NODE_HOVERED_CLASS = 'ant-tree-treenode-hovered'

export const overrideAntdTreeStyles = `
    .ant-tree {
      height: 100%;
    }

    .ant-tree-treenode {
      overflow: hidden;
    }

    .ant-tree-node-content-wrapper {
      /*
        we have to set min-width to 0 to alow text
        truncate in CuiTreeItem to work without having
        to set the overflow to hidden or set an explicit
        width value. This is because, by default, flex
        items cannot be smaller than the size of their content,
        but setting min-width: 0 overrides this.
        
        note that we can't set overflow to hidden because
        that breaks the drop-indicator.
      */
      min-width: 0;
      padding-bottom: 2px;
      padding-top: 2px;
      display: flex;
      justify-content: flex-start;
    }

    .ant-tree-treenode-selected.dragging .codelabui-tree-item {
      color: #ffffff !important;
    }

    .ant-tree-treenode-selected.dragging .codelabui-tree-item span {
      color: #ffffff !important;
    }

    .ant-tree-treenode-selected .codelabui-tree-item {
      color: #ffffff !important;
    }

    .ant-tree-treenode-selected .codelabui-tree-item span {
      color: #ffffff !important;
    }

    .ant-tree-treenode-selected::before {
      background-color: #1890ff !important;
    }

    ${TREE_ITEM_TOOLBAR_SELECTOR} {
      display: none;
    }

    .ant-tree-treenode-selected ${TREE_ITEM_TOOLBAR_SELECTOR} {
      display: unset;
    }

    .${TREE_NODE_HOVERED_CLASS} ${TREE_ITEM_TOOLBAR_SELECTOR} {
      display: unset;
    }

    .ant-tree-title {
      flex: 1;
      overflow: hidden;
    }

    .ant-tree-drop-indicator {
      transform: translate(3px, -6px);
    }
`
