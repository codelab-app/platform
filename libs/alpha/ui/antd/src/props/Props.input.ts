import { AnyOf, Schema, getJsonSchema } from '@tsed/schema'
import { JSONSchema6 } from 'json-schema'
import { ButtonProps } from '../components/button/Button.input'
import { RGLItemProps } from '../components/rgl/RGL.input'
import { TextProps } from '../components/text/Text.input'
import { TypographyTitleProps } from '../components/typography/Typography.input'
import { VegaSchema } from '@codelab/generated'

@AnyOf(
  getJsonSchema(ButtonProps),
  getJsonSchema(RGLItemProps),
  getJsonSchema(TypographyTitleProps),
  getJsonSchema(TextProps),
)
export class Props {}

@Schema(VegaSchema as JSONSchema6)
export class CssProps {}
