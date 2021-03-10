import { PaginationProps as AntPaginationProps } from 'antd/lib/pagination'
import * as React from 'react'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

// @JsonSchemaQuickJumperDependencies()
@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class PaginationProps implements AntPaginationProps {

  @RjsfGridProp({
    title: 'Current',
    description: 'Current page number',
    row: 0,
    span: 24,
  })
  current?: number

  @RjsfGridProp({
    title: 'Default Current',
    description: 'Default initial page number',
    default: 1,
    row: 1,
    span: 24,
  })
  defaultCurrent?: number

  @RjsfGridProp({
    title: 'Default Page Size',
    description: 'Default number of data items per page',
    default: 10,
    row: 2,
    span: 24,
  })
  defaultPageSize?: number

  @RjsfGridProp({
    title: 'disabled',
    description: 'Disable pagination',
    row: 3,
    span: 24,
  })
  disabled?: boolean

  @RjsfGridProp({
    title: 'Hide On Single Page',
    description: 'Whether to hide pager on single page',
    row: 4,
    span: 24,
  })
  hideOnSinglePage?: boolean

  // itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode;

  @RjsfGridProp({
    title: 'Page Size',
    description: 'Number of data items per page',
    row: 5,
    span: 24,
  })
  pageSize?: number

  // @CollectionOf(String)
  // @Default(['10', '20', '50', '100'])
  // @Description('Specify the sizeChanger options')
  @RjsfGridProp({
    title: 'Page Size Options',
    description: 'Specify the sizeChanger options',
    type: 'string',
    isArray: true,
    default: ['10', '20', '50', '100'],
    row: 6,
    span: 24,
  })
  pageSizeOptions?: Array<string>

  @RjsfGridProp({
    title: 'Responsive',
    description: 'If size is not specified, Pagination would resize according to the width of the window',
    row: 7,
    span: 24,
  })
  responsive?: boolean

  @RjsfGridProp({
    title: 'Show Less Items',
    description: 'Show less page items',
    row: 8,
    span: 24,
  })
  showLessItems?: boolean

  @RjsfGridProp({
    title: 'Show Quick Jumper',
    description: 'Determine whether you can jump to pages directly',
    type: 'boolean',
    row: 9,
    span: 12,
  })
  showQuickJumper?:
    | boolean
    | {
        goButton?: React.ReactNode
      }

  @RjsfGridProp({
    row: 9,
    span: 12,
    title: 'Go Button',
    type: 'string',
    condition: {key: 'showQuickJumper', value: true}
  })
  declare goButton: string

  @RjsfGridProp({
    title: 'Show Size Changer',
    description: 'Determine whether to show pageSize select, it will be true when total > 50',
    row: 10,
    span: 24,
  })
  showSizeChanger?: boolean

  @RjsfGridProp({
    title: 'Show Title',
    description: 'Show page item\'s title',
    row: 11,
    span: 24,
  })
  showTitle?: boolean

  // showTotal?: (total: number, range: [number, number]) => React.ReactNode;

  @RjsfGridProp({
    title: 'Simple',
    description: 'Whether to use simple mode',
    row: 12,
    span: 24,
  })
  simple?: boolean

  @RjsfGridProp({
    title: 'Size',
    description: 'Specify the size of Pagination, can be set to small',
    type: 'string',
    enum: ['default', 'small'],
    default: 'default',
    row: 13,
    span: 24,
  })
  size?: 'default' | 'small'

  @RjsfGridProp({
    title: 'Total',
    description: 'Total number of data items',
    default: 0,
    row: 14,
    span: 24,
  })
  total?: number

  // onChange?: (page: number, pageSize?: number) => void;

  // onShowSizeChange?: (current: number, size: number) => void;
}

// export class PaginationProps {
//   @Property()
//   @Enum(VertexType.React_Pagination)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
