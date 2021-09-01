import { AtomType } from '@codelab/shared/enums'
import dynamic from 'next/dynamic'
import React from 'react'

/**
 * Returns a ReactComponent corresponding to the input AtomType
 * Returns null if a mapping is not found
 */
export const atomFactory = (
  atomType: AtomType,
): React.ComponentType<any> | string | null => {
  // Switch statement instead of a map, since otherwise they would all get loaded into memory
  switch (atomType) {
    //
    // HTML
    //
    case AtomType.ReactFragment:
      return React.Fragment
    case AtomType.HtmlDiv:
      return 'div'
    case AtomType.HtmlSpan:
      return 'span'
    case AtomType.HtmlA:
      return 'a'
    case AtomType.HtmlP:
      return 'p'
    case AtomType.HtmlVideo:
      return 'video'
    case AtomType.HtmlUList:
      return 'ul'
    case AtomType.HtmlTrack:
      return 'track'
    case AtomType.HtmlTitle:
      return 'title'
    case AtomType.HtmlTime:
      return 'time'
    case AtomType.HtmlTextarea:
      return 'textarea'
    case AtomType.HtmlTemplate:
      return 'template'
    case AtomType.HtmlTableRow:
      return 'tr'
    case AtomType.HtmlTable:
      return 'table'
    case AtomType.HtmlTableCol:
      return 'col'
    case AtomType.HtmlTableCell:
      return 'td'
    case AtomType.HtmlTableCaption:
      return 'caption'
    case AtomType.HtmlStyle:
      return 'style'
    case AtomType.HtmlSource:
      return 'source'
    case AtomType.HtmlSelect:
      return 'select'
    case AtomType.HtmlQuote:
      return 'blockquote'
    case AtomType.HtmlProgress:
      return 'progress'
    case AtomType.HtmlPre:
      return 'pre'
    case AtomType.HtmlPicture:
      return 'picture'
    case AtomType.HtmlParam:
      return 'param'
    case AtomType.HtmlOutput:
      return 'output'
    case AtomType.HtmlOption:
      return 'option'
    case AtomType.HtmlOptgroup:
      return 'optgroup'
    case AtomType.HtmlObject:
      return 'object'
    case AtomType.HtmlOList:
      return 'ol'
    case AtomType.HtmlMeter:
      return 'meter'
    case AtomType.HtmlMeta:
      return 'meta'
    case AtomType.HtmlMap:
      return 'map'
    case AtomType.HtmlLink:
      return 'link'
    case AtomType.HtmlLegend:
      return 'legend'
    case AtomType.HtmlLabel:
      return 'label'
    case AtomType.HtmlLi:
      return 'li'
    case AtomType.HtmlInput:
      return 'input'
    case AtomType.HtmlImage:
      return 'img'
    case AtomType.HtmlIframe:
      return 'iframe'
    case AtomType.HtmlH1:
      return 'h1'
    case AtomType.HtmlH2:
      return 'h2'
    case AtomType.HtmlH3:
      return 'h3'
    case AtomType.HtmlH4:
      return 'h4'
    case AtomType.HtmlH5:
      return 'h5'
    case AtomType.HtmlH6:
      return 'h6'
    case AtomType.HtmlHead:
      return 'head'
    case AtomType.HtmlHr:
      return 'hr'
    case AtomType.HtmlFrameset:
      return 'frameset'
    case AtomType.HtmlFrame:
      return 'frame'
    case AtomType.HtmlForm:
      return 'form'
    case AtomType.HtmlFont:
      return 'font'
    case AtomType.HtmlFieldset:
      return 'fieldset'
    case AtomType.HtmlEmbed:
      return 'embed'
    case AtomType.HtmlDialog:
      return 'dialog'
    case AtomType.HtmlDetails:
      return 'details'
    case AtomType.HtmlDatalist:
      return 'datalist'
    case AtomType.HtmlData:
      return 'data'
    case AtomType.HtmlDList:
      return 'dl'
    case AtomType.HtmlCanvas:
      return 'canvas'
    case AtomType.HtmlButton:
      return 'button'
    case AtomType.HtmlBase:
      return 'base'
    case AtomType.HtmlBr:
      return 'br'
    case AtomType.HtmlAudio:
      return 'audio'
    case AtomType.HtmlArea:
      return 'area'
    case AtomType.HtmlFooter:
      return 'footer'
    case AtomType.HtmlHeader:
      return 'header'
    case AtomType.HtmlAside:
      return 'aside'
    case AtomType.HtmlMain:
      return 'main'
    case AtomType.HtmlNav:
      return 'nav'
    case AtomType.HtmlSection:
      return 'section'
    case AtomType.HtmlCode:
      return 'code'
    case AtomType.HtmlEm:
      return 'em'
    case AtomType.HtmlI:
      return 'i'
    case AtomType.HtmlS:
      return 's'
    case AtomType.HtmlSmall:
      return 'small'
    case AtomType.HtmlStrong:
      return 'strong'
    case AtomType.HtmlSub:
      return 'sub'
    case AtomType.HtmlSup:
      return 'sup'
    //
    // Ant Design
    //
    case AtomType.AntDesignIcon:
      return dynamic(() =>
        import('@ant-design/compatible').then((mod) => mod.Icon),
      )
    case AtomType.AntDesignMenu:
      return dynamic(() => import('antd/lib/menu'))
    case AtomType.AntDesignMenuItem:
      return dynamic(() => import('antd/lib/menu/MenuItem'))
    case AtomType.AntDesignMenuItemGroup:
      return dynamic(() =>
        import('antd/lib/menu').then((mod) => mod.default.ItemGroup),
      )
    case AtomType.AntDesignMenuSubMenu:
      return dynamic(() => import('antd/lib/menu/SubMenu'))
    case AtomType.AntDesignGridCol:
      return dynamic(() => import('antd/lib/grid/col'))
    case AtomType.AntDesignGridRow:
      return dynamic(() => import('antd/lib/grid/row'))
    case AtomType.AntDesignCard:
      return dynamic(() => import('antd/lib/card'))
    case AtomType.AntDesignCardGrid:
      return dynamic(() => import('antd/lib/card/Grid'))
    case AtomType.AntDesignCardMeta:
      return dynamic(() => import('antd/lib/card/Meta'))
    case AtomType.AntDesignTypography:
      return dynamic(() => import('antd/lib/typography'))
    case AtomType.AntDesignTypographyTitle:
      return dynamic(() => import('antd/lib/typography/Title'))
    case AtomType.AntDesignTypographyText:
      return dynamic(() => import('antd/lib/typography/Text'))
    case AtomType.AntDesignTypographyParagraph:
      return dynamic(() => import('antd/lib/typography/Paragraph'))
    case AtomType.AntDesignAlert:
      return dynamic(() => import('antd/lib/alert'))
    case AtomType.AntDesignAffix:
      return dynamic(() => import('antd/lib/affix'))
    case AtomType.AntDesignAutoComplete:
      return dynamic(() => import('antd/lib/auto-complete'))
    case AtomType.AntDesignButton:
      return dynamic(() => import('antd/lib/button'))
    case AtomType.AntDesignBreadcrumb:
      return dynamic(() => import('antd/lib/breadcrumb'))
    case AtomType.AntDesignBreadcrumbItem:
      return dynamic(() =>
        import('antd/lib/breadcrumb').then((mod) => mod.default.Item),
      )
    case AtomType.AntDesignDropdown:
      return dynamic(() => import('antd/lib/dropdown'))
    case AtomType.AntDesignForm:
      return dynamic(() => import('antd/lib/form'))
    case AtomType.AntDesignFormItem:
      return dynamic(() => import('antd/lib/form/FormItem'))
    case AtomType.AntDesignFormList:
      return dynamic(() => import('antd/lib/form/FormList'))
    case AtomType.AntDesignCheckbox:
      return dynamic(() => import('antd/lib/checkbox'))
    case AtomType.AntDesignInput:
      return dynamic(() => import('antd/lib/input'))
    case AtomType.AntDesignInputNumber:
      return dynamic(() => import('antd/lib/input-number'))
    case AtomType.AntDesignSelect:
      return dynamic(() => import('antd/lib/select'))
    case AtomType.AntDesignSelectOption:
      return dynamic(() =>
        import('antd/lib/select').then((mod) => mod.default.Option),
      )
    case AtomType.AntDesignRglContainer:
      return dynamic(() => import('react-grid-layout'))
    case AtomType.AntDesignRglItem:
      return 'div'
    case AtomType.AntDesignRglResponsiveContainer:
      return dynamic(() =>
        import('react-grid-layout').then(({ WidthProvider, Responsive }) =>
          WidthProvider(Responsive),
        ),
      )
    case AtomType.AntDesignModal:
      return dynamic(() => import('antd/lib/modal'))
    case AtomType.AntDesignRadioGroup:
      return dynamic(() => import('antd/lib/radio/group'))
    case AtomType.AntDesignRadio:
      return dynamic(() => import('antd/lib/radio'))
    case AtomType.AntDesignRate:
      return dynamic(() => import('antd/lib/rate'))
    case AtomType.AntDesignSlider:
      return dynamic(() => import('antd/lib/slider') as any)
    case AtomType.AntDesignSwitch:
      return dynamic(() => import('antd/lib/switch'))
    case AtomType.AntDesignSpace:
      return dynamic(() => import('antd/lib/space'))
    case AtomType.AntDesignDatePicker:
      return dynamic(() => import('antd/lib/date-picker'))
    case AtomType.AntDesignDivider:
      return dynamic(() => import('antd/lib/divider'))
    case AtomType.AntDesignPagination:
      return dynamic(() => import('antd/lib/pagination'))
    case AtomType.AntDesignPageHeader:
      return dynamic(() => import('antd/lib/page-header'))
    case AtomType.AntDesignBadge:
      return dynamic(() => import('antd/lib/badge'))
    case AtomType.AntDesignAvatar:
      return dynamic(() => import('antd/lib/avatar'))
    case AtomType.AntDesignComment:
      return dynamic(() => import('antd/lib/comment'))
    case AtomType.AntDesignCalendar:
      return dynamic(() => import('antd/lib/calendar'))
    case AtomType.AntDesignDescriptions:
      return dynamic(() => import('antd/lib/descriptions'))
    case AtomType.AntDesignDescriptionsItem:
      return dynamic(() => import('antd/lib/descriptions/Item'))
    case AtomType.AntDesignEmpty:
      return dynamic(() => import('antd/lib/empty'))
    case AtomType.AntDesignTimeline:
      return dynamic(() => import('antd/lib/timeline'))
    case AtomType.AntDesignTimelineItem:
      return dynamic(() => import('antd/lib/timeline/TimelineItem'))
    case AtomType.AntDesignTabs:
      return dynamic(() => import('antd/lib/tabs'))
    case AtomType.AntDesignTabsTabPane:
      return dynamic(() =>
        import('antd/lib/tabs').then((mod) => mod.default.TabPane),
      )
    case AtomType.AntDesignStatistic:
      return dynamic(() => import('antd/lib/statistic'))
    case AtomType.AntDesignTooltip:
      return dynamic(() => import('antd/lib/tooltip'))
    case AtomType.AntDesignTag:
      return dynamic(() => import('antd/lib/tag'))
    case AtomType.AntDesignTree:
      return dynamic(() => import('antd/lib/tree'))
    case AtomType.AntDesignDrawer:
      return dynamic(() => import('antd/lib/drawer'))
    case AtomType.AntDesignProgress:
      return dynamic(() => import('antd/lib/progress') as any)
    case AtomType.AntDesignResult:
      return dynamic(() => import('antd/lib/result'))
    case AtomType.AntDesignSpin:
      return dynamic(() => import('antd/lib/spin'))
    case AtomType.AntDesignSkeleton:
      return dynamic(() => import('antd/lib/skeleton'))
    case AtomType.AntDesignAnchor:
      return dynamic(() => import('antd/lib/anchor'))
    case AtomType.AntDesignAnchorLink:
      return dynamic(() => import('antd/lib/anchor/AnchorLink'))
    case AtomType.AntDesignBackTop:
      return dynamic(() => import('antd/lib/back-top'))
    case AtomType.AntDesignConfigProvider:
      return dynamic(() => import('antd/lib/config-provider'))
    case AtomType.AntDesignPopconfirm:
      return dynamic(() => import('antd/lib/popconfirm'))
    case AtomType.AntDesignTransfer:
      return 'null'
    case AtomType.AntDesignTreeSelect:
      return dynamic(() => import('antd/lib/tree-select'))
    case AtomType.AntDesignTreeNode:
      return dynamic(() =>
        import('antd/lib/tree-select').then((mod) => mod.default.TreeNode),
      )
    case AtomType.AntDesignTimePicker:
      return dynamic(() => import('antd/lib/time-picker'))
    case AtomType.AntDesignUpload:
      return dynamic(() => import('antd/lib/upload'))
    case AtomType.AntDesignSteps:
      return dynamic(() => import('antd/lib/steps'))
    case AtomType.AntDesignStepsStep:
      return dynamic(() =>
        import('antd/lib/steps').then((mod) => mod.default.Step),
      )
    case AtomType.AntDesignCollapse:
      return dynamic(() => import('antd/lib/collapse'))
    case AtomType.AntDesignCollapsePanel:
      return dynamic(() => import('antd/lib/collapse/CollapsePanel'))
    case AtomType.AntDesignCarousel:
      return dynamic(() => import('antd/lib/carousel'))
    case AtomType.AntDesignList:
      return dynamic(() => import('antd/lib/list'))
    case AtomType.AntDesignListItem:
      return dynamic(() => import('antd/lib/list/Item'))
    case AtomType.AntDesignListItemMeta:
      return dynamic(() =>
        import('antd/lib/list/Item').then((mod) => mod.default.Meta),
      )
    case AtomType.AntDesignMentions:
      return dynamic(() => import('antd/lib/mentions'))
    case AtomType.AntDesignMentionsOption:
      return dynamic(() =>
        import('antd/lib/mentions').then((mod) => mod.Option),
      )
    case AtomType.AntDesignLayout:
      return dynamic(() => import('antd/lib/layout'))
    case AtomType.AntDesignLayoutHeader:
      return dynamic(() =>
        import('antd/lib/layout').then((mod) => mod.default.Header),
      )
    case AtomType.AntDesignLayoutSider:
      return dynamic(() => import('antd/lib/layout/Sider'))
    case AtomType.AntDesignLayoutContent:
      return dynamic(() =>
        import('antd/lib/layout').then((mod) => mod.default.Content),
      )
    case AtomType.AntDesignLayoutFooter:
      return dynamic(() =>
        import('antd/lib/layout').then((mod) => mod.default.Footer),
      )
    case AtomType.AntDesignCascader:
      return ''
    case AtomType.AntDesignPopover:
      return dynamic(() => import('antd/lib/popover'))
    case AtomType.AntDesignTable:
      return dynamic(() => import('antd/lib/table'))
    case AtomType.AntDesignImage:
      return dynamic(() => import('antd/lib/image'))
    case AtomType.AntDesignRenderComponent:
      return ''
    case AtomType.AntDesignRenderContainer:
      return ''
    case AtomType.AntDesignMapper:
      return ''
    case AtomType.AntDesignFormItemHook:
      return ''
    case AtomType.AntDesignPageContainer:
      return ''
    //
    // Custom
    //
    case AtomType.Query:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then((mod) => mod.Query),
      )
    case AtomType.TextList:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then((mod) => mod.TextList),
      )
    case AtomType.Text:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then((mod) => mod.Text),
      )
    case AtomType.State:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then((mod) => mod.State),
      )
    case AtomType.PropMapper:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then(
          (mod) => mod.PropMapper,
        ),
      )
    case AtomType.Mapper:
      return dynamic(() =>
        import('@codelab/frontend/view/components').then((mod) => mod.Mapper),
      )
    default:
      return null
  }
}
