import type { IAntdAtomRecords } from '@codelab/shared/abstract/core'

import { IAntdCategoryTag, IAtomType } from '@codelab/shared/abstract/core'

/**
 * Assign all data that is related to the atom here
 */
// TODO: remove the partial in key
export const antdAtomData: IAntdAtomRecords = {
  //
  // Antd:
  //
  [IAtomType.AntDesignAffix]: {
    file: 'Affix',
    icon: IAtomType.AntDesignAffix,
    tag: IAtomType.AntDesignAffix,
  },
  [IAtomType.AntDesignAlert]: {
    file: 'Alert--Alert.ErrorBoundary',
    icon: IAtomType.AntDesignAlert,
    tag: IAtomType.AntDesignAlert,
  },
  [IAtomType.AntDesignAnchor]: {
    file: 'Anchor--Anchor Props',
    icon: IAtomType.AntDesignAnchor,
    tag: IAtomType.AntDesignAnchor,
  },
  [IAtomType.AntDesignAnchorLink]: {
    file: 'Anchor--Link Props',
    icon: IAtomType.AntDesignAnchorLink,
    tag: IAtomType.AntDesignAnchorLink,
  },
  [IAtomType.AntDesignAutoComplete]: {
    file: null,
    icon: IAtomType.AntDesignAutoComplete,
    tag: IAtomType.AntDesignAutoComplete,
  },
  [IAtomType.AntDesignAvatar]: {
    file: 'Avatar',
    icon: IAtomType.AntDesignAvatar,
    tag: IAtomType.AntDesignAvatar,
  },
  // 'Avatar--Avatar.Group (4.5.0+)': IAtomType.AntDesignAvatar,
  [IAtomType.AntDesignBackTop]: {
    file: 'BackTop',
    icon: IAtomType.AntDesignBackTop,
    tag: IAtomType.AntDesignBackTop,
  },
  [IAtomType.AntDesignBadge]: {
    file: 'Badge',
    icon: IAtomType.AntDesignBadge,
    tag: IAtomType.AntDesignBadge,
  },
  // 'Badge--Badge.Ribbon (4.5.0+)': IAtomType.AntDesignBadge,
  [IAtomType.AntDesignBreadcrumb]: {
    file: 'Breadcrumb',
    icon: IAtomType.AntDesignBreadcrumb,
    tag: IAtomType.AntDesignBreadcrumb,
  },
  [IAtomType.AntDesignButton]: {
    file: 'Button',
    icon: IAtomType.AntDesignButton,
    tag: IAtomType.AntDesignButton,
  },
  [IAtomType.AntDesignCalendar]: {
    file: 'Calendar',
    icon: IAtomType.AntDesignCalendar,
    tag: IAtomType.AntDesignCalendar,
  },
  [IAtomType.AntDesignCard]: {
    file: 'Card',
    icon: IAtomType.AntDesignCard,
    tag: IAtomType.AntDesignCard,
  },
  [IAtomType.AntDesignCardGrid]: {
    file: 'Card--Card.Grid',
    icon: IAtomType.AntDesignCard,
    tag: IAtomType.AntDesignCardGrid,
  },
  [IAtomType.AntDesignCardMeta]: {
    file: 'Card--Card.Meta',
    icon: IAtomType.AntDesignCard,
    tag: IAtomType.AntDesignCardMeta,
  },
  [IAtomType.AntDesignCarousel]: {
    file: null,
    icon: IAtomType.AntDesignCarousel,
    tag: IAtomType.AntDesignCarousel,
  },
  [IAtomType.AntDesignCascader]: {
    // file: Cascader--showSearch',
    file: null,
    icon: IAtomType.AntDesignCascader,
    tag: IAtomType.AntDesignCascader,
  },
  [IAtomType.AntDesignCheckbox]: {
    file: 'Checkbox--Props',
    icon: IAtomType.AntDesignCheckbox,
    tag: IAtomType.AntDesignCheckbox,
  },
  [IAtomType.AntDesignCheckboxGroup]: {
    file: 'Checkbox--Props',
    icon: IAtomType.AntDesignCheckbox,
    tag: IAtomType.AntDesignCheckboxGroup,
  },
  [IAtomType.AntDesignCollapse]: {
    file: 'Collapse',
    icon: IAtomType.AntDesignCollapse,
    tag: IAtomType.AntDesignCollapse,
  },
  [IAtomType.AntDesignConfigProvider]: {
    file: 'ConfigProvider',
    icon: IAtomType.AntDesignConfigProvider,
    tag: IAtomType.AntDesignConfigProvider,
  },
  [IAtomType.AntDesignDatePicker]: {
    file: 'DatePicker',
    icon: IAtomType.AntDesignDatePicker,
    tag: IAtomType.AntDesignDatePicker,
  },
  // 'DatePicker--Common API': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=month]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=quarter]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=week]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--DatePicker[picker=year]': IAtomType.AntDesignDatePicker,
  // 'DatePicker--RangePicker': IAtomType.AntDesignDatePicker,
  [IAtomType.AntDesignDescriptions]: {
    file: 'Descriptions',
    icon: IAtomType.AntDesignDescriptions,
    tag: IAtomType.AntDesignDescriptions,
  },
  [IAtomType.AntDesignDivider]: {
    file: 'Divider',
    icon: IAtomType.AntDesignDivider,
    tag: IAtomType.AntDesignDivider,
  },
  [IAtomType.AntDesignDrawer]: {
    file: 'Drawer',
    icon: IAtomType.AntDesignDrawer,
    tag: IAtomType.AntDesignDrawer,
  },
  [IAtomType.AntDesignDropdown]: {
    file: 'Dropdown',
    icon: IAtomType.AntDesignDropdown,
    tag: IAtomType.AntDesignDropdown,
  },
  [IAtomType.AntDesignDropdownButton]: {
    // file: 'Dropdown--Dropdown.Button',
    file: null,
    icon: IAtomType.AntDesignDropdown,
    tag: IAtomType.AntDesignDropdown,
  },
  [IAtomType.AntDesignEmpty]: {
    file: 'Empty',
    icon: IAtomType.AntDesignEmpty,
    tag: IAtomType.AntDesignEmpty,
  },
  [IAtomType.AntDesignForm]: {
    file: 'Form',
    icon: IAtomType.AntDesignForm,
    suggestedChildren: [IAtomType.AntDesignFormItem],
    tag: IAtomType.AntDesignForm,
  },
  [IAtomType.AntDesignFormErrorList]: {
    file: null,
    icon: IAtomType.AntDesignForm,
    tag: IAtomType.AntDesignFormErrorList,
  },
  [IAtomType.AntDesignFormItem]: {
    file: 'Form--Item',
    icon: IAtomType.AntDesignForm,
    suggestedChildren: [
      IAtomType.AntDesignInput,
      IAtomType.AntDesignButton,
      IAtomType.AntDesignCheckbox,
      IAtomType.AntDesignRadioGroup,
    ],
    tag: IAtomType.AntDesignFormItem,
  },
  [IAtomType.AntDesignFormList]: {
    file: null,
    icon: IAtomType.AntDesignForm,
    tag: IAtomType.AntDesignFormList,
  },
  [IAtomType.AntDesignFormProvider]: {
    file: null,
    icon: IAtomType.AntDesignForm,
    tag: IAtomType.AntDesignFormProvider,
  },
  // 'Form--FormInstance': IAtomType.AntDesignForm,
  [IAtomType.AntDesignGridCol]: {
    file: 'Grid--Col',
    icon: 'Grid',
    tag: IAtomType.AntDesignGridCol,
  },
  [IAtomType.AntDesignGridRow]: {
    file: 'Grid--Row',
    icon: 'Grid',
    tag: IAtomType.AntDesignGridRow,
  },
  [IAtomType.AntDesignIcon]: {
    file: 'Icon--Common Icon',
    icon: IAtomType.AntDesignIcon,
    tag: IAtomType.AntDesignIcon,
  },
  [IAtomType.AntDesignImage]: {
    file: 'Image',
    icon: IAtomType.AntDesignImage,
    tag: IAtomType.AntDesignImage,
  },
  // 'Icon--Custom Icon': IAtomType.AntDesignIcon,
  // Image: IAtomType.AntDesignImage,
  [IAtomType.AntDesignInput]: {
    file: 'Input',
    icon: IAtomType.AntDesignInput,
    tag: IAtomType.AntDesignInput,
  },
  [IAtomType.AntDesignInputNumber]: {
    file: null,
    icon: IAtomType.AntDesignInputNumber,
    tag: IAtomType.AntDesignInputNumber,
  },
  [IAtomType.AntDesignInputSearch]: {
    file: null,
    icon: IAtomType.AntDesignInputSearch,
    tag: IAtomType.AntDesignInputSearch,
  },
  [IAtomType.AntDesignInputTextArea]: {
    file: null,
    icon: IAtomType.AntDesignInputTextArea,
    tag: IAtomType.AntDesignInputTextArea,
  },
  // 'Input--Input.TextArea': IAtomType.AntDesignInput,
  [IAtomType.AntDesignLayout]: {
    file: 'Layout',
    icon: IAtomType.AntDesignLayout,
    tag: IAtomType.AntDesignLayout,
  },
  [IAtomType.AntDesignLayoutContent]: {
    file: null,
    icon: IAtomType.AntDesignLayoutContent,
    tag: IAtomType.AntDesignLayoutContent,
  },
  [IAtomType.AntDesignLayoutFooter]: {
    file: null,
    icon: IAtomType.AntDesignLayout,
    tag: IAtomType.AntDesignLayoutFooter,
  },
  [IAtomType.AntDesignLayoutHeader]: {
    file: null,
    icon: IAtomType.AntDesignLayout,
    tag: IAtomType.AntDesignLayoutHeader,
  },
  [IAtomType.AntDesignLayoutSider]: {
    file: 'Layout--Layout.Sider',
    icon: IAtomType.AntDesignLayout,
    tag: IAtomType.AntDesignLayoutSider,
  },
  [IAtomType.AntDesignList]: {
    file: 'List',
    icon: IAtomType.AntDesignList,
    tag: IAtomType.AntDesignList,
  },
  [IAtomType.AntDesignListItem]: {
    file: 'List--List.Item',
    icon: IAtomType.AntDesignList,
    tag: IAtomType.AntDesignListItem,
  },
  [IAtomType.AntDesignListItemMeta]: {
    file: 'List--List.Item.Meta',
    icon: IAtomType.AntDesignList,
    tag: IAtomType.AntDesignListItemMeta,
  },
  // 'List--List grid props': IAtomType.AntDesignList,
  // 'List--pagination': IAtomType.AntDesignList,
  [IAtomType.AntDesignMentions]: {
    file: 'Mentions--Mention',
    icon: IAtomType.AntDesignMentions,
    tag: IAtomType.AntDesignMentions,
  },
  [IAtomType.AntDesignMenu]: {
    file: 'Menu',
    icon: IAtomType.AntDesignMenu,
    tag: IAtomType.AntDesignMenu,
  },
  [IAtomType.AntDesignMessage]: {
    file: null,
    icon: IAtomType.AntDesignMessage,
    tag: IAtomType.AntDesignMessage,
  },
  [IAtomType.AntDesignModal]: {
    file: 'Modal',
    icon: IAtomType.AntDesignModal,
    tag: IAtomType.AntDesignModal,
  },
  [IAtomType.AntDesignNotification]: {
    file: null,
    icon: IAtomType.AntDesignNotification,
    tag: IAtomType.AntDesignNotification,
  },
  [IAtomType.AntDesignPagination]: {
    file: 'Pagination',
    icon: IAtomType.AntDesignPagination,
    tag: IAtomType.AntDesignPagination,
  },
  [IAtomType.AntDesignPopconfirm]: {
    file: 'Popconfirm',
    icon: IAtomType.AntDesignPopconfirm,
    tag: IAtomType.AntDesignPopconfirm,
  },
  [IAtomType.AntDesignPopover]: {
    file: 'Popover',
    icon: IAtomType.AntDesignPopover,
    tag: IAtomType.AntDesignPopover,
  },
  [IAtomType.AntDesignProgress]: {
    file: 'Progress--type=circle',
    icon: IAtomType.AntDesignProgress,
    tag: IAtomType.AntDesignProgress,
  },
  [IAtomType.AntDesignRadio]: {
    file: 'Radio--Radio_Radio.Button',
    icon: IAtomType.AntDesignRadio,
    tag: IAtomType.AntDesignRadio,
  },
  [IAtomType.AntDesignRadioGroup]: {
    file: 'Radio--RadioGroup',
    icon: IAtomType.AntDesignRadio,
    tag: IAtomType.AntDesignRadioGroup,
  },
  [IAtomType.AntDesignRate]: {
    file: null,
    icon: IAtomType.AntDesignRate,
    tag: IAtomType.AntDesignRate,
  },
  [IAtomType.AntDesignResult]: {
    file: 'Result',
    icon: IAtomType.AntDesignResult,
    tag: IAtomType.AntDesignResult,
  },
  [IAtomType.AntDesignSegmented]: {
    file: 'Popover',
    icon: IAtomType.AntDesignSegmented,
    tag: IAtomType.AntDesignSegmented,
  },
  // 'Select--OptGroup props': IAtomType.AntDesignSelect,
  [IAtomType.AntDesignSelect]: {
    file: 'Select--Select props',
    icon: IAtomType.AntDesignSelect,
    tag: IAtomType.AntDesignSelect,
  },
  [IAtomType.AntDesignSelectOption]: {
    file: 'Select--Option props',
    icon: IAtomType.AntDesignSelect,
    tag: IAtomType.AntDesignSelectOption,
  },
  [IAtomType.AntDesignSkeleton]: {
    file: 'Skeleton',
    icon: IAtomType.AntDesignSkeleton,
    tag: IAtomType.AntDesignSkeleton,
  },
  [IAtomType.AntDesignSlider]: {
    file: 'Slider--range',
    icon: IAtomType.AntDesignSlider,
    tag: IAtomType.AntDesignSlider,
  },
  [IAtomType.AntDesignSpace]: {
    file: 'Space',
    icon: IAtomType.AntDesignSpace,
    tag: IAtomType.AntDesignSpace,
  },
  [IAtomType.AntDesignSpin]: {
    file: 'Spin',
    icon: IAtomType.AntDesignSpin,
    tag: IAtomType.AntDesignSpin,
  },
  [IAtomType.AntDesignStatistic]: {
    file: null,
    icon: IAtomType.AntDesignStatistic,
    tag: IAtomType.AntDesignStatistic,
  },
  [IAtomType.AntDesignSteps]: {
    file: 'Steps',
    icon: IAtomType.AntDesignSteps,
    tag: IAtomType.AntDesignSteps,
  },
  [IAtomType.AntDesignStepsStep]: {
    file: 'Steps--Steps.Step',
    icon: IAtomType.AntDesignSteps,
    tag: IAtomType.AntDesignStepsStep,
  },
  [IAtomType.AntDesignSwitch]: {
    file: null,
    icon: IAtomType.AntDesignSwitch,
    tag: IAtomType.AntDesignSwitch,
  },
  [IAtomType.AntDesignTable]: {
    file: 'Table',
    icon: IAtomType.AntDesignTable,
    tag: IAtomType.AntDesignTable,
  },
  // 'Table--Column': IAtomType.AntDesignTable,
  // 'Table--ColumnGroup': IAtomType.AntDesignTable,
  // 'Table--expandable': IAtomType.AntDesignTable,
  // 'Table--pagination': IAtomType.AntDesignTable,
  // 'Table--rowSelection': IAtomType.AntDesignTable,
  // 'Table--scroll': IAtomType.AntDesignTable,
  // 'Table--selection': IAtomType.AntDesignTable,
  [IAtomType.AntDesignTabs]: {
    file: 'Tabs',
    icon: IAtomType.AntDesignTabs,
    tag: IAtomType.AntDesignTabs,
  },
  [IAtomType.AntDesignTabsTabPane]: {
    file: 'Tabs--Tabs.TabPane',
    icon: IAtomType.AntDesignTabs,
    tag: IAtomType.AntDesignTabsTabPane,
  },
  [IAtomType.AntDesignTag]: {
    file: 'Tag',
    icon: IAtomType.AntDesignTag,
    tag: IAtomType.AntDesignTag,
  },
  // 'Tag--Tag.CheckableTag': IAtomType.AntDesignTag,
  [IAtomType.AntDesignTimeline]: {
    file: 'Timeline',
    icon: IAtomType.AntDesignTimeline,
    tag: IAtomType.AntDesignTimeline,
  },
  [IAtomType.AntDesignTimePicker]: {
    file: null,
    icon: IAtomType.AntDesignTimePicker,
    tag: IAtomType.AntDesignTimePicker,
  },
  // 'TimePicker--RangePicker': IAtomType.AntDesignTimePicker,
  [IAtomType.AntDesignTooltip]: {
    file: 'Tooltip--Common API',
    icon: IAtomType.AntDesignTooltip,
    tag: IAtomType.AntDesignTooltip,
  },
  [IAtomType.AntDesignTransfer]: {
    file: null,
    icon: IAtomType.AntDesignTransfer,
    tag: IAtomType.AntDesignTransfer,
  },
  // 'Transfer--Render Props': IAtomType.AntDesignTransfer,
  // 'Tree--DirectoryTree props': IAtomType.AntDesignTree,
  [IAtomType.AntDesignTree]: {
    file: 'Tree--Tree props',
    icon: IAtomType.AntDesignTree,
    tag: IAtomType.AntDesignTree,
  },
  [IAtomType.AntDesignTreeSelect]: {
    file: 'TreeSelect--Tree props',
    icon: IAtomType.AntDesignTreeSelect,
    tag: IAtomType.AntDesignTreeSelect,
  },
  // 'Typography--copyable': IAtomType.AntDesignTypography,
  // 'Typography--editable': IAtomType.AntDesignTypography,
  // 'Typography--ellipsis': IAtomType.AntDesignTypography,
  [IAtomType.AntDesignTypographyParagraph]: {
    file: 'Typography--Typography.Paragraph',
    icon: IAntdCategoryTag.AntDesignTypography,
    tag: IAtomType.AntDesignTypographyParagraph,
  },
  [IAtomType.AntDesignTypographyText]: {
    file: 'Typography--Typography.Text',
    icon: IAntdCategoryTag.AntDesignTypography,
    tag: IAtomType.AntDesignTypographyText,
  },
  [IAtomType.AntDesignTypographyTitle]: {
    file: 'Typography--Typography.Title',
    icon: IAntdCategoryTag.AntDesignTypography,
    tag: IAtomType.AntDesignTypographyText,
  },
  [IAtomType.AntDesignUpload]: {
    file: 'Upload--UploadFile',
    icon: IAtomType.AntDesignUpload,
    tag: IAtomType.AntDesignUpload,
  },

  //
  // Custom components:
  //
  // [IAtomType.Query]: {
  //   file: 'Query',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.TextList]: {
  //   file: 'TextList',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.Text]: {
  //   file: 'Text',
  //   tag: null,
  //   icon: null,
  // },
  // [IAtomType.State]: {
  //   file: 'State',
  //   tag: null,
  //   icon: null,
  // },
}
