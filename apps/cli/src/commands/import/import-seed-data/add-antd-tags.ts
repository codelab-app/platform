import { IAtomExport } from '@codelab/shared/abstract/core'
import { searchRelatedParentName } from './utils'

const atomNamesByTag: Record<string, Array<string>> = {
  General: ['Button', 'Icon', 'Typography'],
  Layout: ['Divider', 'Grid', 'Layout', 'Space'],
  Navigation: [
    'Affix',
    'Breadcrumb',
    'Dropdown',
    'Menu',
    'Pagination',
    'PageHeader',
    'Steps',
  ],
  'Data Entry': [
    'AutoComplete',
    'Cascader',
    'Checkbox',
    'DatePicker',
    'Form',
    'Input',
    'InputNumber',
    'Mentions',
    'Radio',
    'Rate',
    'Select',
    'Slider',
    'Switch',
    'TimePicker',
    'Transfer',
    'TreeSelect',
    'Upload',
  ],
  'Data Display': [
    'Avatar',
    'Badge',
    'Comment',
    'Collapse',
    'Carousel',
    'Card',
    'Calendar',
    'Descriptions',
    'Empty',
    'Image',
    'List',
    'Popover',
    'Statistic',
    'Tree',
    'Tooltip',
    'Timeline',
    'Tag',
    'Tabs',
    'Table',
  ],
  Feedback: [
    'Alert',
    'Draw',
    'Modal',
    'Message',
    'Notification',
    'Progress',
    'Popconfirm',
    'Result',
    'Spin',
    'Skeleton',
  ],
  Other: ['Anchor', 'BackTop'],
}

export const antTagNames = Object.keys(atomNamesByTag)

const antdCompNames = antTagNames.flatMap((tag) => atomNamesByTag[tag])

export const addAntdUseCaseTags = (atoms: Array<IAtomExport>) => {
  return atoms.map((atom) => {
    const name = atom.name

    if (!name.includes('AntDesign')) {
      return atom
    }

    const nameWithoutAntDesign = name.replace('AntDesign', '')

    const relatedParentName = searchRelatedParentName(
      nameWithoutAntDesign,
      antdCompNames,
    )

    const foundTag = antTagNames.find((tag) =>
      atomNamesByTag[tag].includes(relatedParentName || nameWithoutAntDesign),
    )

    if (!foundTag) {
      console.log(`[Import antd atoms] No tags assign for ${name}`)
    }

    return {
      ...atom,
      tags: foundTag ? [{ name: foundTag }] : [{ name: 'Other' }],
    }
  })
}
