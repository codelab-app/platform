import type { IAntdAtomRecords, TagNode } from '@codelab/backend/abstract/core'
import { IAntdCategoryTag } from '@codelab/backend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'

/**
 * This contains hierarchical tag data for Ant Design
 */
export const antdTagTree: TagNode<IAntdCategoryTag | keyof IAntdAtomRecords> = {
  [IAntdCategoryTag.General]: [
    IAtomType.AntDesignButton,
    IAtomType.AntDesignIcon,
    {
      [IAntdCategoryTag.Typography]: [
        IAtomType.AntDesignTypographyText,
        IAtomType.AntDesignTypographyTitle,
        IAtomType.AntDesignTypographyParagraph,
      ],
    },
  ],
  [IAntdCategoryTag.Layout]: [
    IAtomType.AntDesignDivider,
    IAtomType.AntDesignGridRow,
    IAtomType.AntDesignGridCol,
    IAtomType.AntDesignLayoutSider,
    IAtomType.AntDesignSpace,
  ],
  [IAntdCategoryTag.Navigation]: [
    IAtomType.AntDesignAffix,
    {
      [IAtomType.AntDesignBreadcrumb]: [
        IAtomType.AntDesignBreadcrumbItem,
        IAtomType.AntDesignBreadcrumbSeparator,
      ],
    },
    { [IAtomType.AntDesignDropdown]: [IAtomType.AntDesignDropdownButton] },
    IAtomType.AntDesignMenu,
    IAtomType.AntDesignPagination,
    { [IAtomType.AntDesignSteps]: [IAtomType.AntDesignStepsStep] },
  ],
  [IAntdCategoryTag.DataEntry]: [
    IAtomType.AntDesignAutoComplete,
    IAtomType.AntDesignCascader,
    { [IAtomType.AntDesignCheckbox]: [IAtomType.AntDesignCheckboxGroup] },
    IAtomType.AntDesignDatePicker,
    {
      [IAtomType.AntDesignForm]: [
        IAtomType.AntDesignFormItem,
        IAtomType.AntDesignFormList,
        IAtomType.AntDesignFormErrorList,
        IAtomType.AntDesignFormProvider,
      ],
    },
    IAtomType.AntDesignInput,
    IAtomType.AntDesignInputNumber,
    { [IAtomType.AntDesignMentions]: [IAtomType.AntDesignMentionsOption] },
    { [IAtomType.AntDesignRadio]: [IAtomType.AntDesignRadioGroup] },
    IAtomType.AntDesignRate,
    { [IAtomType.AntDesignSelect]: [IAtomType.AntDesignSelectOption] },
    IAtomType.AntDesignSlider,
    IAtomType.AntDesignSwitch,
    IAtomType.AntDesignTimePicker,
    IAtomType.AntDesignTransfer,
    IAtomType.AntDesignTreeSelect,
    IAtomType.AntDesignUpload,
  ],
  [IAntdCategoryTag.DataDisplay]: [
    IAtomType.AntDesignAvatar,
    IAtomType.AntDesignBadge,
    IAtomType.AntDesignComment,
    { [IAtomType.AntDesignCollapse]: [IAtomType.AntDesignCollapsePanel] },
    IAtomType.AntDesignCarousel,
    {
      [IAtomType.AntDesignCard]: [
        IAtomType.AntDesignCardGrid,
        IAtomType.AntDesignCardMeta,
      ],
    },
    IAtomType.AntDesignCalendar,
    {
      [IAtomType.AntDesignDescriptions]: [IAtomType.AntDesignDescriptionsItem],
    },
    IAtomType.AntDesignEmpty,
    IAtomType.AntDesignImage,
    {
      [IAtomType.AntDesignList]: [
        { [IAtomType.AntDesignListItem]: [IAtomType.AntDesignListItemMeta] },
      ],
    },
    IAtomType.AntDesignPopover,
    IAtomType.AntDesignSegmented,
    IAtomType.AntDesignStatistic,
    IAtomType.AntDesignTree,
    IAtomType.AntDesignTooltip,
    { [IAtomType.AntDesignTimeline]: [IAtomType.AntDesignTimelineItem] },
    IAtomType.AntDesignTag,
    { [IAtomType.AntDesignTabs]: [IAtomType.AntDesignTabsTabPane] },
    IAtomType.AntDesignTable,
  ],
  [IAntdCategoryTag.Feedback]: [
    IAtomType.AntDesignAlert,
    IAtomType.AntDesignDrawer,
    IAtomType.AntDesignModal,
    IAtomType.AntDesignMessage,
    IAtomType.AntDesignNotification,
    IAtomType.AntDesignProgress,
    IAtomType.AntDesignPopconfirm,
    IAtomType.AntDesignResult,
    IAtomType.AntDesignSpin,
    IAtomType.AntDesignSkeleton,
  ],
  [IAntdCategoryTag.Other]: [
    { [IAtomType.AntDesignAnchor]: [IAtomType.AntDesignAnchorLink] },
    IAtomType.AntDesignBackTop,
    IAtomType.AntDesignConfigProvider,
  ],
}
