import { IAtomType } from '@codelab/shared/abstract/core'
import { dynamicImport } from '../import'
import { AtomsRecord } from '../types'

export const antdAtoms: AtomsRecord = {
  [IAtomType.AntDesignGridRow]: dynamicImport(import('antd/lib/grid/row')),
  [IAtomType.AntDesignIcon]: dynamicImport(import('@ant-design/icons')),
  [IAtomType.AntDesignMenu]: dynamicImport(import('antd/lib/menu')),
  [IAtomType.AntDesignMenuItem]: dynamicImport(
    import('antd/lib/menu/MenuItem'),
  ),
  [IAtomType.AntDesignMenuItemGroup]: dynamicImport(
    import('antd/lib/menu'),
    (mod) => mod.default.ItemGroup,
  ),
  [IAtomType.AntDesignMenuSubMenu]: dynamicImport(
    import('antd/lib/menu/SubMenu'),
  ),
  [IAtomType.AntDesignGridCol]: dynamicImport(import('antd/lib/grid/col')),
  [IAtomType.AntDesignCard]: dynamicImport(import('antd/lib/card')),
  [IAtomType.AntDesignCardGrid]: dynamicImport(import('antd/lib/card/Grid')),
  [IAtomType.AntDesignCardMeta]: dynamicImport(import('antd/lib/card/Meta')),
  [IAtomType.AntDesignTypography]: dynamicImport(import('antd/lib/typography')),
  [IAtomType.AntDesignTypographyTitle]: dynamicImport(
    import('antd/lib/typography/Title'),
  ),
  [IAtomType.AntDesignTypographyText]: dynamicImport(
    import('antd/lib/typography/Text'),
  ),
  [IAtomType.AntDesignTypographyParagraph]: dynamicImport(
    import('antd/lib/typography/Paragraph'),
  ),
  [IAtomType.AntDesignAlert]: dynamicImport(import('antd/lib/alert')),
  [IAtomType.AntDesignAffix]: dynamicImport(import('antd/lib/affix')),
  [IAtomType.AntDesignAutoComplete]: dynamicImport(
    import('antd/lib/auto-complete'),
  ),
  [IAtomType.AntDesignButton]: dynamicImport(import('antd/lib/button')),
  [IAtomType.AntDesignBreadcrumb]: dynamicImport(import('antd/lib/breadcrumb')),
  [IAtomType.AntDesignBreadcrumbItem]: dynamicImport(
    import('antd/lib/breadcrumb'),
    (mod) => mod.default.Item,
  ),
  [IAtomType.AntDesignDropdown]: dynamicImport(import('antd/lib/dropdown')),
  [IAtomType.AntDesignForm]: dynamicImport(import('antd/lib/form')),
  [IAtomType.AntDesignFormItem]: dynamicImport(
    import('antd/lib/form/FormItem'),
  ),
  [IAtomType.AntDesignFormList]: dynamicImport(
    import('antd/lib/form/FormList'),
  ),
  [IAtomType.AntDesignCheckbox]: dynamicImport(import('antd/lib/checkbox')),
  [IAtomType.AntDesignInput]: dynamicImport(import('antd/lib/input')),
  [IAtomType.AntDesignInputNumber]: dynamicImport(
    import('antd/lib/input-number'),
  ),
  [IAtomType.AntDesignSelect]: dynamicImport(import('antd/lib/select')),
  [IAtomType.AntDesignSelectOption]: dynamicImport(
    import('antd/lib/select'),
    (mod) => mod.default.Option,
  ),
  [IAtomType.AntDesignRglContainer]: dynamicImport(import('react-grid-layout')),
  [IAtomType.AntDesignRglResponsiveContainer]: dynamicImport(
    import('react-grid-layout'),
    (module) => null,
  ),
  [IAtomType.AntDesignModal]: dynamicImport(import('antd/lib/modal')),
  [IAtomType.AntDesignRadioGroup]: dynamicImport(
    import('antd/lib/radio/group'),
  ),
  [IAtomType.AntDesignRadio]: dynamicImport(import('antd/lib/radio')),
  [IAtomType.AntDesignRate]: dynamicImport(import('antd/lib/rate')),
  [IAtomType.AntDesignSlider]: dynamicImport(import('antd/lib/slider')),
  [IAtomType.AntDesignSwitch]: dynamicImport(import('antd/lib/switch')),
  [IAtomType.AntDesignSpace]: dynamicImport(import('antd/lib/space')),
  [IAtomType.AntDesignDatePicker]: dynamicImport(
    import('antd/lib/date-picker'),
  ),
  [IAtomType.AntDesignDivider]: dynamicImport(import('antd/lib/divider')),
  [IAtomType.AntDesignPagination]: dynamicImport(import('antd/lib/pagination')),
  [IAtomType.AntDesignPageHeader]: dynamicImport(
    import('antd/lib/page-header'),
  ),
  [IAtomType.AntDesignBadge]: dynamicImport(import('antd/lib/badge')),
  [IAtomType.AntDesignAvatar]: dynamicImport(import('antd/lib/avatar')),
  [IAtomType.AntDesignComment]: dynamicImport(import('antd/lib/comment')),
  [IAtomType.AntDesignCalendar]: dynamicImport(import('antd/lib/calendar')),
  [IAtomType.AntDesignDescriptions]: dynamicImport(
    import('antd/lib/descriptions'),
  ),
  [IAtomType.AntDesignDescriptionsItem]: dynamicImport(
    import('antd/lib/descriptions/Item'),
  ),
  [IAtomType.AntDesignEmpty]: dynamicImport(import('antd/lib/empty')),
  [IAtomType.AntDesignTimeline]: dynamicImport(import('antd/lib/timeline')),
  [IAtomType.AntDesignTimelineItem]: dynamicImport(
    import('antd/lib/timeline/TimelineItem'),
  ),
  [IAtomType.AntDesignTabs]: dynamicImport(import('antd/lib/tabs')),
  [IAtomType.AntDesignTabsTabPane]: dynamicImport(
    import('antd/lib/tabs'),
    (mod) => mod.default.TabPane,
  ),
  [IAtomType.AntDesignStatistic]: dynamicImport(import('antd/lib/statistic')),
  [IAtomType.AntDesignTooltip]: dynamicImport(import('antd/lib/tooltip')),
  [IAtomType.AntDesignTag]: dynamicImport(import('antd/lib/tag')),
  [IAtomType.AntDesignTree]: dynamicImport(import('antd/lib/tree')),
  [IAtomType.AntDesignDrawer]: dynamicImport(import('antd/lib/drawer')),
  [IAtomType.AntDesignProgress]: dynamicImport(import('antd/lib/progress')),
  [IAtomType.AntDesignResult]: dynamicImport(import('antd/lib/result')),
  [IAtomType.AntDesignSpin]: dynamicImport(import('antd/lib/spin')),
  [IAtomType.AntDesignSkeleton]: dynamicImport(import('antd/lib/skeleton')),
  [IAtomType.AntDesignAnchor]: dynamicImport(import('antd/lib/anchor')),
  [IAtomType.AntDesignAnchorLink]: dynamicImport(
    import('antd/lib/anchor/AnchorLink'),
  ),
  [IAtomType.AntDesignBackTop]: dynamicImport(import('antd/lib/back-top')),
  [IAtomType.AntDesignConfigProvider]: dynamicImport(
    import('antd/lib/config-provider'),
  ),
  [IAtomType.AntDesignPopconfirm]: dynamicImport(import('antd/lib/popconfirm')),
  [IAtomType.AntDesignTreeSelect]: dynamicImport(
    import('antd/lib/tree-select'),
  ),
  [IAtomType.AntDesignTreeNode]: dynamicImport(
    import('antd/lib/tree-select'),
    (mod) => mod.default.TreeNode,
  ),
  [IAtomType.AntDesignTimePicker]: dynamicImport(
    import('antd/lib/time-picker'),
  ),
  [IAtomType.AntDesignUpload]: dynamicImport(import('antd/lib/upload')),
  [IAtomType.AntDesignSteps]: dynamicImport(import('antd/lib/steps')),
  [IAtomType.AntDesignStepsStep]: dynamicImport(
    import('antd/lib/steps'),
    (mod) => mod.default.Step,
  ),
  [IAtomType.AntDesignCollapse]: dynamicImport(import('antd/lib/collapse')),
  [IAtomType.AntDesignCollapsePanel]: dynamicImport(
    import('antd/lib/collapse/CollapsePanel'),
  ),
  [IAtomType.AntDesignCarousel]: dynamicImport(import('antd/lib/carousel')),
  [IAtomType.AntDesignList]: dynamicImport(import('antd/lib/list')),
  [IAtomType.AntDesignListItem]: dynamicImport(import('antd/lib/list/Item')),
  [IAtomType.AntDesignListItemMeta]: dynamicImport(
    import('antd/lib/list/Item'),
    (mod) => mod.default.Meta,
  ),
  [IAtomType.AntDesignMentions]: dynamicImport(import('antd/lib/mentions')),
  [IAtomType.AntDesignMentionsOption]: dynamicImport(
    import('antd/lib/mentions'),
    (mod) => mod.Option,
  ),
  [IAtomType.AntDesignLayout]: dynamicImport(import('antd/lib/layout')),
  [IAtomType.AntDesignLayoutHeader]: dynamicImport(
    import('antd/lib/layout'),
    (mod) => mod.default.Header,
  ),
  [IAtomType.AntDesignLayoutSider]: dynamicImport(
    import('antd/lib/layout/Sider'),
  ),
  [IAtomType.AntDesignLayoutContent]: dynamicImport(
    import('antd/lib/layout'),
    (mod) => mod.default.Content,
  ),
  [IAtomType.AntDesignLayoutFooter]: dynamicImport(
    import('antd/lib/layout'),
    (mod) => mod.default.Footer,
  ),
  [IAtomType.AntDesignPopover]: dynamicImport(import('antd/lib/popover')),
  [IAtomType.AntDesignTable]: dynamicImport(import('antd/lib/table')),
  [IAtomType.AntDesignImage]: dynamicImport(import('antd/lib/image')),
}
