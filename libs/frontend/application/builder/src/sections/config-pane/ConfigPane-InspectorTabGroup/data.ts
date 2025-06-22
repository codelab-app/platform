import { IConfigPaneTab } from '@codelab/shared-abstract-core'

const tabTitles: { [key in IConfigPaneTab]: string } = {
  [IConfigPaneTab.Component]: 'Component',
  [IConfigPaneTab.Css]: 'CSS',
  [IConfigPaneTab.Node]: 'Node',
  [IConfigPaneTab.Page]: 'Page',
  [IConfigPaneTab.Props]: 'Props',
  [IConfigPaneTab.PropsInspector]: 'Props Inspector',
  [IConfigPaneTab.PropsTransformation]: 'Props Transformation',
  [IConfigPaneTab.PropsMap]: 'Props Map',
}

export const getTabTitle = (tabKey: IConfigPaneTab) => tabTitles[tabKey]
