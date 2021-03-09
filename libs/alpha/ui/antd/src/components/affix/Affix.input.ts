import { Description, } from '@tsed/schema'
import { AffixProps as AntAffixProps } from 'antd/lib/affix'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class AffixProps implements Omit<AntAffixProps, 'children'> {

  @RjsfGridProp({
    title: 'Offset Bottom',
    description: 'Offset from the bottom of the viewport (in pixels)',
    row: 0,
    span: 12,
  })
  offsetBottom?: number

  @Description('Offset from the top of the viewport (in pixels)')
  @RjsfGridProp({
    title: 'Offset Top',
    description: 'Offset from the top of the viewport (in pixels)',
    default: 0,
    row: 0,
    span: 12,
  })
  offsetTop?: number

  // onChange?: (affixed?: boolean) => void;
  // target?: () => Window | HTMLElement | null;
}

// export class AffixProps {
//   @Property()
//   @Enum(VertexType.React_Affix)
//   declare type: string
//
//   @Schema(getJsonSchema(Props, { customKeys: true }))
//   @Title('')
//   declare props: object
// }
