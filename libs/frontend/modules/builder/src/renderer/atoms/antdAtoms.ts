import { AtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from './atomFactoryType'

export const antdAtoms: AtomsRecord = {
  [AtomType.AntDesignGridRow]: dynamic(() => import('antd/lib/grid/row')),
  [AtomType.AntDesignIcon]: dynamic(() => import('antd/lib/icon')),
  [AtomType.AntDesignMenu]: dynamic(() => import('antd/lib/menu')),
  [AtomType.AntDesignMenuItem]: dynamic(() => import('antd/lib/menu/MenuItem')),
  [AtomType.AntDesignMenuItemGroup]: dynamic(() =>
    import('antd/lib/menu').then((mod) => mod.default.ItemGroup as any),
  ),
  [AtomType.AntDesignMenuSubMenu]: dynamic(
    () => import('antd/lib/menu/SubMenu'),
  ),
  [AtomType.AntDesignGridCol]: dynamic(() => import('antd/lib/grid/col')),
  [AtomType.AntDesignCard]: dynamic(() => import('antd/lib/card')),
  [AtomType.AntDesignCardGrid]: dynamic(() => import('antd/lib/card/Grid')),
  [AtomType.AntDesignCardMeta]: dynamic(() => import('antd/lib/card/Meta')),
  [AtomType.AntDesignTypography]: dynamic(() => import('antd/lib/typography')),
  [AtomType.AntDesignTypographyTitle]: dynamic(
    () => import('antd/lib/typography/Title'),
  ),
  [AtomType.AntDesignTypographyText]: dynamic(
    () => import('antd/lib/typography/Text'),
  ),
  [AtomType.AntDesignTypographyParagraph]: dynamic(
    () => import('antd/lib/typography/Paragraph'),
  ),
  [AtomType.AntDesignAlert]: dynamic(() => import('antd/lib/alert')),
  [AtomType.AntDesignAffix]: dynamic(() => import('antd/lib/affix')),
  [AtomType.AntDesignAutoComplete]: dynamic(
    () => import('antd/lib/auto-complete'),
  ),
  [AtomType.AntDesignButton]: dynamic(() => import('antd/lib/button')),
  [AtomType.AntDesignBreadcrumb]: dynamic(() => import('antd/lib/breadcrumb')),
  [AtomType.AntDesignBreadcrumbItem]: dynamic(() =>
    import('antd/lib/breadcrumb').then((mod) => mod.default.Item as any),
  ),
  [AtomType.AntDesignDropdown]: dynamic(() => import('antd/lib/dropdown')),
  [AtomType.AntDesignForm]: dynamic(() => import('antd/lib/form')),
  [AtomType.AntDesignFormItem]: dynamic(() => import('antd/lib/form/FormItem')),
  [AtomType.AntDesignFormList]: dynamic(() => import('antd/lib/form/FormList')),
  [AtomType.AntDesignCheckbox]: dynamic(() => import('antd/lib/checkbox')),
  [AtomType.AntDesignInput]: dynamic(() => import('antd/lib/input')),
  [AtomType.AntDesignInputNumber]: dynamic(
    () => import('antd/lib/input-number'),
  ),
  [AtomType.AntDesignSelect]: dynamic(() => import('antd/lib/select')),
  [AtomType.AntDesignSelectOption]: dynamic(() =>
    import('antd/lib/select').then((mod) => mod.default.Option as any),
  ),
  [AtomType.AntDesignRglContainer]: dynamic(() => import('react-grid-layout')),
  [AtomType.AntDesignRglResponsiveContainer]: dynamic(
    () =>
      import('react-grid-layout').then(
        ({ WidthProvider, Responsive }) => Responsive,
        // WidthProvider(Responsive),
      ) as any,
  ),
  [AtomType.AntDesignModal]: dynamic(() => import('antd/lib/modal')),
  [AtomType.AntDesignRadioGroup]: dynamic(() => import('antd/lib/radio/group')),
  [AtomType.AntDesignRadio]: dynamic(() => import('antd/lib/radio')),
  [AtomType.AntDesignRate]: dynamic(() => import('antd/lib/rate')),
  [AtomType.AntDesignSlider]: dynamic(() => import('antd/lib/slider') as any),
  [AtomType.AntDesignSwitch]: dynamic(() => import('antd/lib/switch')),
  [AtomType.AntDesignSpace]: dynamic(() => import('antd/lib/space')),
  [AtomType.AntDesignDatePicker]: dynamic(() => import('antd/lib/date-picker')),
  [AtomType.AntDesignDivider]: dynamic(() => import('antd/lib/divider')),
  [AtomType.AntDesignPagination]: dynamic(() => import('antd/lib/pagination')),
  [AtomType.AntDesignPageHeader]: dynamic(() => import('antd/lib/page-header')),
  [AtomType.AntDesignBadge]: dynamic(() => import('antd/lib/badge')),
  [AtomType.AntDesignAvatar]: dynamic(() => import('antd/lib/avatar')),
  [AtomType.AntDesignComment]: dynamic(() => import('antd/lib/comment')),
  [AtomType.AntDesignCalendar]: dynamic(() => import('antd/lib/calendar')),
  [AtomType.AntDesignDescriptions]: dynamic(
    () => import('antd/lib/descriptions'),
  ),
  [AtomType.AntDesignDescriptionsItem]: dynamic(
    () => import('antd/lib/descriptions/Item'),
  ),
  [AtomType.AntDesignEmpty]: dynamic(() => import('antd/lib/empty')),
  [AtomType.AntDesignTimeline]: dynamic(() => import('antd/lib/timeline')),
  [AtomType.AntDesignTimelineItem]: dynamic(
    () => import('antd/lib/timeline/TimelineItem'),
  ),
  [AtomType.AntDesignTabs]: dynamic(() => import('antd/lib/tabs')),
  [AtomType.AntDesignTabsTabPane]: dynamic(
    () => import('antd/lib/tabs').then((mod) => mod.default.TabPane) as any,
  ),
  [AtomType.AntDesignStatistic]: dynamic(() => import('antd/lib/statistic')),
  [AtomType.AntDesignTooltip]: dynamic(() => import('antd/lib/tooltip')),
  [AtomType.AntDesignTag]: dynamic(() => import('antd/lib/tag')),
  [AtomType.AntDesignTree]: dynamic(() => import('antd/lib/tree')),
  [AtomType.AntDesignDrawer]: dynamic(() => import('antd/lib/drawer')),
  [AtomType.AntDesignProgress]: dynamic(
    () => import('antd/lib/progress') as any,
  ),
  [AtomType.AntDesignResult]: dynamic(() => import('antd/lib/result')),
  [AtomType.AntDesignSpin]: dynamic(() => import('antd/lib/spin')),
  [AtomType.AntDesignSkeleton]: dynamic(() => import('antd/lib/skeleton')),
  [AtomType.AntDesignAnchor]: dynamic(() => import('antd/lib/anchor')),
  [AtomType.AntDesignAnchorLink]: dynamic(
    () => import('antd/lib/anchor/AnchorLink'),
  ),
  [AtomType.AntDesignBackTop]: dynamic(() => import('antd/lib/back-top')),
  [AtomType.AntDesignConfigProvider]: dynamic(
    () => import('antd/lib/config-provider'),
  ),
  [AtomType.AntDesignPopconfirm]: dynamic(() => import('antd/lib/popconfirm')),
  [AtomType.AntDesignTreeSelect]: dynamic(() => import('antd/lib/tree-select')),
  [AtomType.AntDesignTreeNode]: dynamic(
    () =>
      import('antd/lib/tree-select').then((mod) => mod.default.TreeNode) as any,
  ),
  [AtomType.AntDesignTimePicker]: dynamic(() => import('antd/lib/time-picker')),
  [AtomType.AntDesignUpload]: dynamic(() => import('antd/lib/upload')),
  [AtomType.AntDesignSteps]: dynamic(() => import('antd/lib/steps')),
  [AtomType.AntDesignStepsStep]: dynamic(
    () => import('antd/lib/steps').then((mod) => mod.default.Step) as any,
  ),
  [AtomType.AntDesignCollapse]: dynamic(() => import('antd/lib/collapse')),
  [AtomType.AntDesignCollapsePanel]: dynamic(
    () => import('antd/lib/collapse/CollapsePanel'),
  ),
  [AtomType.AntDesignCarousel]: dynamic(() => import('antd/lib/carousel')),
  [AtomType.AntDesignList]: dynamic(() => import('antd/lib/list')),
  [AtomType.AntDesignListItem]: dynamic(() => import('antd/lib/list/Item')),
  [AtomType.AntDesignListItemMeta]: dynamic(
    () => import('antd/lib/list/Item').then((mod) => mod.default.Meta) as any,
  ),
  [AtomType.AntDesignMentions]: dynamic(() => import('antd/lib/mentions')),
  [AtomType.AntDesignMentionsOption]: dynamic(
    () => import('antd/lib/mentions').then((mod) => mod.Option) as any,
  ),
  [AtomType.AntDesignLayout]: dynamic(() => import('antd/lib/layout')),
  [AtomType.AntDesignLayoutHeader]: dynamic(
    () => import('antd/lib/layout').then((mod) => mod.default.Header) as any,
  ),
  [AtomType.AntDesignLayoutSider]: dynamic(
    () => import('antd/lib/layout/Sider'),
  ),
  [AtomType.AntDesignLayoutContent]: dynamic(
    () => import('antd/lib/layout').then((mod) => mod.default.Content) as any,
  ),
  [AtomType.AntDesignLayoutFooter]: dynamic(
    () => import('antd/lib/layout').then((mod) => mod.default.Footer) as any,
  ),
  [AtomType.AntDesignPopover]: dynamic(() => import('antd/lib/popover')),
  [AtomType.AntDesignTable]: dynamic(() => import('antd/lib/table')),
  [AtomType.AntDesignImage]: dynamic(() => import('antd/lib/image')),
}
