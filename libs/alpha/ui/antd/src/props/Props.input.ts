import { AnyOf, getJsonSchema } from '@tsed/schema'
import { ButtonProps } from '../components/button/Button.input'
import { RGLItemProps } from '../components/rgl/RGL.input'
import { TextProps } from '../components/text/Text.input'
import { TypographyTitleProps } from '../components/typography/Typography.input'

@AnyOf(
  getJsonSchema(ButtonProps),
  getJsonSchema(RGLItemProps),
  getJsonSchema(TypographyTitleProps),
  getJsonSchema(TextProps),
)
export class Props {}
