import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button as AntdButton } from 'antd'
import React from 'react'
import ButtonMDXDocumentation from './Button.mdx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: AntdButton,
  argTypes: {
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      page: ButtonMDXDocumentation,
    },
  },
} as ComponentMeta<typeof AntdButton>

const Template: ComponentStory<typeof AntdButton> = ({ ...rest }) => {
  console.log(rest)

  return <AntdButton {...rest}>Click Me</AntdButton>
}

export const ExampleButton = Template.bind({})

ExampleButton.args = {
  size: 'small',
}
