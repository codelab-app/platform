import { Property, Title } from '@tsed/schema'

@Title('Text')
export class TextProps {
  @Property()
  declare value: string
}
