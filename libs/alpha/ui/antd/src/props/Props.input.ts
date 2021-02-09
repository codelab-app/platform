import { AnyOf, Schema, getJsonSchema } from '@tsed/schema'
import { JSONSchema6 } from 'json-schema'
import { ButtonProps } from '../components/button/Button.input'
import { RGLItemProps } from '../components/rgl/RGL.input'
import { TextProps } from '../components/text/Text.input'
import { TypographyTitleProps } from '../components/typography/Typography.input'
import { VegaSchema } from '@codelab/generated'

@OneOf(getJsonSchema(ButtonProps), getJsonSchema(RGLItemProps))
export class Props {
  // declare props: object
}

@Schema(VegaSchema as JSONSchema6)
export class CssProps {}
