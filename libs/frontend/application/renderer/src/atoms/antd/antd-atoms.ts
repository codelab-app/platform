import type { IAtomRendererRecord } from '@codelab/frontend/abstract/domain'

import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'

export const antdAtoms: IAtomRendererRecord = {
  [IAtomType.AntDesignAffix]: dynamicLoader(() => import('antd/lib/affix')),
  [IAtomType.AntDesignAlert]: dynamicLoader(() => import('antd/lib/alert')),
  [IAtomType.AntDesignAnchor]: dynamicLoader(() => import('antd/lib/anchor')),
  [IAtomType.AntDesignAnchorLink]: dynamicLoader(
    () => import('antd/lib/anchor/AnchorLink'),
  ),
  [IAtomType.AntDesignAutoComplete]: dynamicLoader(
    () => import('antd/lib/auto-complete'),
  ),
  [IAtomType.AntDesignAvatar]: dynamicLoader(() => import('antd/lib/avatar')),
  [IAtomType.AntDesignBackTop]: dynamicLoader(() =>
    import('antd/lib/float-button').then((mod) => mod.default.BackTop),
  ),
  // [IAtomType.AntDesignPageHeader]: dynamicLoader(() =>
  //   import('@ant-design/pro-components/lib').then((mod) => mod.PageHeader),
  // ),
  [IAtomType.AntDesignBadge]: dynamicLoader(() => import('antd/lib/badge')),
  [IAtomType.AntDesignBreadcrumb]: dynamicLoader(
    () => import('antd/lib/breadcrumb'),
  ),
  [IAtomType.AntDesignButton]: dynamicLoader(() => import('antd/lib/button')),
  [IAtomType.AntDesignCalendar]: dynamicLoader(
    () => import('antd/lib/calendar'),
  ),
  [IAtomType.AntDesignCard]: dynamicLoader(() => import('antd/lib/card')),
  [IAtomType.AntDesignCardGrid]: dynamicLoader(
    () => import('antd/lib/card/Grid'),
  ),
  [IAtomType.AntDesignCardMeta]: dynamicLoader(
    () => import('antd/lib/card/Meta'),
  ),
  [IAtomType.AntDesignCarousel]: dynamicLoader(
    () => import('antd/lib/carousel'),
  ),
  [IAtomType.AntDesignCascader]: dynamicLoader(
    () => import('antd/lib/cascader'),
  ),
  [IAtomType.AntDesignCheckbox]: dynamicLoader(
    () => import('antd/lib/checkbox'),
  ),
  [IAtomType.AntDesignCheckboxGroup]: dynamicLoader(() =>
    import('antd/lib/checkbox').then((mod) => mod.default.Group),
  ),
  [IAtomType.AntDesignCollapse]: dynamicLoader(
    () => import('antd/lib/collapse'),
  ),
  [IAtomType.AntDesignConfigProvider]: dynamicLoader(
    () => import('antd/lib/config-provider'),
  ),
  [IAtomType.AntDesignDatePicker]: dynamicLoader(
    () => import('antd/lib/date-picker'),
  ),
  [IAtomType.AntDesignDescriptions]: dynamicLoader(
    () => import('antd/lib/descriptions'),
  ),
  [IAtomType.AntDesignDivider]: dynamicLoader(() => import('antd/lib/divider')),
  [IAtomType.AntDesignDrawer]: dynamicLoader(() => import('antd/lib/drawer')),
  [IAtomType.AntDesignDropdown]: dynamicLoader(
    () => import('antd/lib/dropdown'),
  ),
  [IAtomType.AntDesignDropdownButton]: dynamicLoader(
    () => import('antd/lib/dropdown'),
  ),
  [IAtomType.AntDesignEmpty]: dynamicLoader(() => import('antd/lib/empty')),
  [IAtomType.AntDesignForm]: dynamicLoader(() => import('antd/lib/form')),
  [IAtomType.AntDesignFormErrorList]: dynamicLoader(
    () => import('antd/lib/form/ErrorList'),
  ),
  [IAtomType.AntDesignFormItem]: dynamicLoader(
    () => import('antd/lib/form/FormItem'),
  ),
  [IAtomType.AntDesignFormList]: dynamicLoader(
    () => import('antd/lib/form/FormList'),
  ),
  [IAtomType.AntDesignFormProvider]: dynamicLoader(
    () => import('antd/lib/form/context') as never,
  ),
  [IAtomType.AntDesignGridCol]: dynamicLoader(
    () => import('antd/lib/grid/col'),
  ),
  [IAtomType.AntDesignGridRow]: dynamicLoader(
    () => import('antd/lib/grid/row'),
  ),
  [IAtomType.AntDesignIcon]: dynamicLoader(() =>
    import(
      '@codelab/frontend-application-atom/components/ant-design/icon'
    ).then((mod) => mod.AntdIcon),
  ),
  [IAtomType.AntDesignImage]: dynamicLoader(() => import('antd/lib/image')),
  [IAtomType.AntDesignInput]: dynamicLoader(() => import('antd/lib/input')),
  [IAtomType.AntDesignInputNumber]: dynamicLoader(
    () => import('antd/lib/input-number'),
  ),
  [IAtomType.AntDesignInputSearch]: dynamicLoader(() =>
    import('antd/lib/input').then((mod) => mod.default.Search),
  ),
  [IAtomType.AntDesignInputTextArea]: dynamicLoader(() =>
    import('antd/lib/input').then((mod) => mod.default.TextArea),
  ),
  [IAtomType.AntDesignLayout]: dynamicLoader(() => import('antd/lib/layout')),
  [IAtomType.AntDesignLayoutContent]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Content),
  ),
  [IAtomType.AntDesignLayoutFooter]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Footer),
  ),
  [IAtomType.AntDesignLayoutHeader]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Header),
  ),
  [IAtomType.AntDesignLayoutSider]: dynamicLoader(
    () => import('antd/lib/layout/Sider'),
  ),
  [IAtomType.AntDesignList]: dynamicLoader(() => import('antd/lib/list')),
  [IAtomType.AntDesignListItem]: dynamicLoader(
    () => import('antd/lib/list/Item'),
  ),
  [IAtomType.AntDesignListItemMeta]: dynamicLoader(() =>
    import('antd/lib/list/Item').then((mod) => mod.default.Meta),
  ),
  [IAtomType.AntDesignMentions]: dynamicLoader(
    () => import('antd/lib/mentions'),
  ),
  [IAtomType.AntDesignMenu]: dynamicLoader(() => import('antd/lib/menu')),
  [IAtomType.AntDesignMessage]: dynamicLoader(
    () => import('antd/lib/message') as never,
  ),
  // [IAtomType.AntDesignRglContainer]: dynamicLoader(
  //   () => import('react-grid-layout'),
  // ),
  // [IAtomType.AntDesignRglResponsiveContainer]: dynamicLoader(
  //   () => import('react-grid-layout'),
  // ),
  [IAtomType.AntDesignModal]: dynamicLoader(() => import('antd/lib/modal')),
  [IAtomType.AntDesignNotification]: dynamicLoader(
    () => import('antd/lib/notification') as never,
  ),
  [IAtomType.AntDesignPagination]: dynamicLoader(
    () => import('antd/lib/pagination'),
  ),
  [IAtomType.AntDesignPopconfirm]: dynamicLoader(
    () => import('antd/lib/popconfirm'),
  ),
  [IAtomType.AntDesignPopover]: dynamicLoader(() => import('antd/lib/popover')),
  [IAtomType.AntDesignProgress]: dynamicLoader(
    () => import('antd/lib/progress'),
  ),
  [IAtomType.AntDesignRadioGroup]: dynamicLoader(
    () => import('antd/lib/radio/group'),
  ),
  [IAtomType.AntDesignRate]: dynamicLoader(() => import('antd/lib/rate')),
  [IAtomType.AntDesignResult]: dynamicLoader(() => import('antd/lib/result')),
  [IAtomType.AntDesignSegmented]: dynamicLoader(
    () => import('antd/lib/segmented'),
  ),
  [IAtomType.AntDesignSelect]: dynamicLoader(() => import('antd/lib/select')),
  [IAtomType.AntDesignSkeleton]: dynamicLoader(
    () => import('antd/lib/skeleton'),
  ),
  [IAtomType.AntDesignSlider]: dynamicLoader(
    () => import('antd/lib/slider') as never,
  ),
  [IAtomType.AntDesignSpace]: dynamicLoader(() => import('antd/lib/space')),
  [IAtomType.AntDesignSpin]: dynamicLoader(() => import('antd/lib/spin')),
  [IAtomType.AntDesignStatistic]: dynamicLoader(
    () => import('antd/lib/statistic'),
  ),
  [IAtomType.AntDesignSteps]: dynamicLoader(() => import('antd/lib/steps')),
  [IAtomType.AntDesignSwitch]: dynamicLoader(() => import('antd/lib/switch')),
  [IAtomType.AntDesignTable]: dynamicLoader(() => import('antd/lib/table')),
  [IAtomType.AntDesignTabs]: dynamicLoader(() => import('antd/lib/tabs')),
  [IAtomType.AntDesignTag]: dynamicLoader(() => import('antd/lib/tag')),
  [IAtomType.AntDesignTimeline]: dynamicLoader(
    () => import('antd/lib/timeline'),
  ),
  [IAtomType.AntDesignTimePicker]: dynamicLoader(
    () => import('antd/lib/time-picker'),
  ),
  [IAtomType.AntDesignTooltip]: dynamicLoader(() => import('antd/lib/tooltip')),
  [IAtomType.AntDesignTransfer]: dynamicLoader(
    () => import('antd/lib/transfer') as never,
  ),
  [IAtomType.AntDesignTree]: dynamicLoader(() => import('antd/lib/tree')),
  [IAtomType.AntDesignTreeSelect]: dynamicLoader(
    () => import('antd/lib/tree-select'),
  ),
  [IAtomType.AntDesignTypographyParagraph]: dynamicLoader(
    () => import('antd/lib/typography/Paragraph'),
  ),
  [IAtomType.AntDesignTypographyText]: dynamicLoader(
    () => import('antd/lib/typography/Text'),
  ),
  [IAtomType.AntDesignTypographyTitle]: dynamicLoader(
    () => import('antd/lib/typography/Title'),
  ),
  [IAtomType.AntDesignUpload]: dynamicLoader(() => import('antd/lib/upload')),
}
