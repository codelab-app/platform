import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicLoader } from '../dynamicLoader'
import type { AtomsRecord } from '../types'

export const antdAtoms: AtomsRecord = {
  [IAtomType.AntDesignGridRow]: dynamicLoader(
    () => import('antd/lib/grid/row'),
  ),
  [IAtomType.AntDesignIcon]: dynamicLoader(() =>
    import('@codelab/frontend/platform/atoms').then((mod) => mod.AntdIcon),
  ),
  [IAtomType.AntDesignMenu]: dynamicLoader(() => import('antd/lib/menu')),
  [IAtomType.AntDesignMenuItem]: dynamicLoader(
    () => import('antd/lib/menu/MenuItem'),
  ),
  [IAtomType.AntDesignMenuItemGroup]: dynamicLoader(() =>
    import('antd/lib/menu').then((mod) => mod.default.ItemGroup),
  ),
  [IAtomType.AntDesignMenuSubMenu]: dynamicLoader(
    () => import('antd/lib/menu/SubMenu'),
  ),
  [IAtomType.AntDesignGridCol]: dynamicLoader(
    () => import('antd/lib/grid/col'),
  ),
  [IAtomType.AntDesignCard]: dynamicLoader(() => import('antd/lib/card')),
  [IAtomType.AntDesignCardGrid]: dynamicLoader(
    () => import('antd/lib/card/Grid'),
  ),
  [IAtomType.AntDesignCardMeta]: dynamicLoader(
    () => import('antd/lib/card/Meta'),
  ),
  [IAtomType.AntDesignTypography]: dynamicLoader(
    () => import('antd/lib/typography'),
  ),
  [IAtomType.AntDesignTypographyTitle]: dynamicLoader(
    () => import('antd/lib/typography/Title'),
  ),
  [IAtomType.AntDesignTypographyText]: dynamicLoader(
    () => import('antd/lib/typography/Text'),
  ),
  [IAtomType.AntDesignTypographyParagraph]: dynamicLoader(
    () => import('antd/lib/typography/Paragraph'),
  ),
  [IAtomType.AntDesignAlert]: dynamicLoader(() => import('antd/lib/alert')),
  [IAtomType.AntDesignAffix]: dynamicLoader(() => import('antd/lib/affix')),
  [IAtomType.AntDesignAutoComplete]: dynamicLoader(
    () => import('antd/lib/auto-complete'),
  ),
  [IAtomType.AntDesignCascader]: dynamicLoader(
    () => import('antd/lib/cascader'),
  ),
  [IAtomType.AntDesignButton]: dynamicLoader(() => import('antd/lib/button')),
  [IAtomType.AntDesignBreadcrumb]: dynamicLoader(
    () => import('antd/lib/breadcrumb'),
  ),
  [IAtomType.AntDesignBreadcrumbItem]: dynamicLoader(() =>
    import('antd/lib/breadcrumb').then((mod) => mod.default.Item),
  ),
  [IAtomType.AntDesignDropdown]: dynamicLoader(
    () => import('antd/lib/dropdown'),
  ),
  [IAtomType.AntDesignDropdownButton]: dynamicLoader(
    () => import('antd/lib/dropdown'),
  ),
  [IAtomType.AntDesignForm]: dynamicLoader(() => import('antd/lib/form')),
  [IAtomType.AntDesignFormItem]: dynamicLoader(
    () => import('antd/lib/form/FormItem'),
  ),
  [IAtomType.AntDesignFormList]: dynamicLoader(
    () => import('antd/lib/form/FormList'),
  ),
  [IAtomType.AntDesignFormErrorList]: dynamicLoader(
    () => import('antd/lib/form/ErrorList'),
  ),
  [IAtomType.AntDesignFormProvider]: dynamicLoader(
    () => import('antd/lib/form/context') as never,
  ),
  [IAtomType.AntDesignCheckbox]: dynamicLoader(
    () => import('antd/lib/checkbox'),
  ),
  [IAtomType.AntDesignCheckboxGroup]: dynamicLoader(() =>
    import('antd/lib/checkbox').then((mod) => mod.default.Group),
  ),
  [IAtomType.AntDesignInput]: dynamicLoader(() => import('antd/lib/input')),
  [IAtomType.AntDesignInputNumber]: dynamicLoader(
    () => import('antd/lib/input-number'),
  ),
  [IAtomType.AntDesignSelect]: dynamicLoader(() => import('antd/lib/select')),
  [IAtomType.AntDesignSelectOption]: dynamicLoader(() =>
    import('antd/lib/select').then((mod) => mod.default.Option),
  ),
  [IAtomType.AntDesignRglContainer]: dynamicLoader(
    () => import('react-grid-layout'),
  ),
  [IAtomType.AntDesignRglResponsiveContainer]: dynamicLoader(
    () => import('react-grid-layout'),
  ),
  [IAtomType.AntDesignModal]: dynamicLoader(() => import('antd/lib/modal')),
  [IAtomType.AntDesignNotification]: dynamicLoader(
    () => import('antd/lib/notification') as never,
  ),
  [IAtomType.AntDesignRadioGroup]: dynamicLoader(
    () => import('antd/lib/radio/group'),
  ),
  [IAtomType.AntDesignRadio]: dynamicLoader(() => import('antd/lib/radio')),
  [IAtomType.AntDesignRate]: dynamicLoader(() => import('antd/lib/rate')),
  [IAtomType.AntDesignSlider]: dynamicLoader(
    () => import('antd/lib/slider') as never,
  ),
  [IAtomType.AntDesignSwitch]: dynamicLoader(() => import('antd/lib/switch')),
  [IAtomType.AntDesignSpace]: dynamicLoader(() => import('antd/lib/space')),
  [IAtomType.AntDesignDatePicker]: dynamicLoader(
    () => import('antd/lib/date-picker'),
  ),
  [IAtomType.AntDesignDivider]: dynamicLoader(() => import('antd/lib/divider')),
  [IAtomType.AntDesignPagination]: dynamicLoader(
    () => import('antd/lib/pagination'),
  ),
  [IAtomType.AntDesignPageHeader]: dynamicLoader(
    () => import('antd/lib/page-header'),
  ),
  [IAtomType.AntDesignBadge]: dynamicLoader(() => import('antd/lib/badge')),
  [IAtomType.AntDesignAvatar]: dynamicLoader(() => import('antd/lib/avatar')),
  [IAtomType.AntDesignComment]: dynamicLoader(() => import('antd/lib/comment')),
  [IAtomType.AntDesignCalendar]: dynamicLoader(
    () => import('antd/lib/calendar'),
  ),
  [IAtomType.AntDesignDescriptions]: dynamicLoader(
    () => import('antd/lib/descriptions'),
  ),
  [IAtomType.AntDesignDescriptionsItem]: dynamicLoader(
    () => import('antd/lib/descriptions/Item'),
  ),
  [IAtomType.AntDesignEmpty]: dynamicLoader(() => import('antd/lib/empty')),
  [IAtomType.AntDesignTimeline]: dynamicLoader(
    () => import('antd/lib/timeline'),
  ),
  [IAtomType.AntDesignTimelineItem]: dynamicLoader(
    () => import('antd/lib/timeline/TimelineItem'),
  ),
  [IAtomType.AntDesignTabs]: dynamicLoader(() => import('antd/lib/tabs')),
  [IAtomType.AntDesignTabsTabPane]: dynamicLoader(() =>
    import('antd/lib/tabs').then((mod) => mod.default.TabPane),
  ),
  [IAtomType.AntDesignStatistic]: dynamicLoader(
    () => import('antd/lib/statistic'),
  ),
  [IAtomType.AntDesignTooltip]: dynamicLoader(() => import('antd/lib/tooltip')),
  [IAtomType.AntDesignTag]: dynamicLoader(() => import('antd/lib/tag')),
  [IAtomType.AntDesignTree]: dynamicLoader(() => import('antd/lib/tree')),
  [IAtomType.AntDesignDrawer]: dynamicLoader(() => import('antd/lib/drawer')),
  [IAtomType.AntDesignMessage]: dynamicLoader(
    () => import('antd/lib/message') as never,
  ),
  [IAtomType.AntDesignProgress]: dynamicLoader(
    () => import('antd/lib/progress'),
  ),
  [IAtomType.AntDesignResult]: dynamicLoader(() => import('antd/lib/result')),
  [IAtomType.AntDesignSpin]: dynamicLoader(() => import('antd/lib/spin')),
  [IAtomType.AntDesignSkeleton]: dynamicLoader(
    () => import('antd/lib/skeleton'),
  ),
  [IAtomType.AntDesignAnchor]: dynamicLoader(() => import('antd/lib/anchor')),
  [IAtomType.AntDesignAnchorLink]: dynamicLoader(
    () => import('antd/lib/anchor/AnchorLink'),
  ),
  [IAtomType.AntDesignBackTop]: dynamicLoader(
    () => import('antd/lib/back-top'),
  ),
  [IAtomType.AntDesignConfigProvider]: dynamicLoader(
    () => import('antd/lib/config-provider'),
  ),
  [IAtomType.AntDesignPopconfirm]: dynamicLoader(
    () => import('antd/lib/popconfirm'),
  ),
  [IAtomType.AntDesignTreeSelect]: dynamicLoader(
    () => import('antd/lib/tree-select'),
  ),
  [IAtomType.AntDesignTreeNode]: dynamicLoader(() =>
    import('antd/lib/tree-select').then((mod) => mod.default.TreeNode),
  ),
  [IAtomType.AntDesignTimePicker]: dynamicLoader(
    () => import('antd/lib/time-picker'),
  ),
  [IAtomType.AntDesignTransfer]: dynamicLoader(
    () => import('antd/lib/transfer') as never,
  ),
  [IAtomType.AntDesignUpload]: dynamicLoader(() => import('antd/lib/upload')),
  [IAtomType.AntDesignSteps]: dynamicLoader(() => import('antd/lib/steps')),
  [IAtomType.AntDesignStepsStep]: dynamicLoader(() =>
    import('antd/lib/steps').then((mod) => mod.default.Step),
  ),
  [IAtomType.AntDesignCollapse]: dynamicLoader(
    () => import('antd/lib/collapse'),
  ),
  [IAtomType.AntDesignCollapsePanel]: dynamicLoader(
    () => import('antd/lib/collapse/CollapsePanel'),
  ),
  [IAtomType.AntDesignCarousel]: dynamicLoader(
    () => import('antd/lib/carousel'),
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
  [IAtomType.AntDesignMentionsOption]: dynamicLoader(() =>
    import('antd/lib/mentions').then((mod) => mod.Option),
  ),
  [IAtomType.AntDesignLayout]: dynamicLoader(() => import('antd/lib/layout')),
  [IAtomType.AntDesignLayoutHeader]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Header),
  ),
  [IAtomType.AntDesignLayoutSider]: dynamicLoader(
    () => import('antd/lib/layout/Sider'),
  ),
  [IAtomType.AntDesignLayoutContent]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Content),
  ),
  [IAtomType.AntDesignLayoutFooter]: dynamicLoader(() =>
    import('antd/lib/layout').then((mod) => mod.default.Footer),
  ),
  [IAtomType.AntDesignPopover]: dynamicLoader(() => import('antd/lib/popover')),
  [IAtomType.AntDesignSegmented]: dynamicLoader(
    () => import('antd/lib/segmented'),
  ),
  [IAtomType.AntDesignTable]: dynamicLoader(() => import('antd/lib/table')),
  [IAtomType.AntDesignImage]: dynamicLoader(() => import('antd/lib/image')),
}
