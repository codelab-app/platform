import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'

export default {
  component: Avatar,
  title: 'Atoms/Avatar',
}

export const Default = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage alt="rick" src="./rick.jpg" />
      <AvatarFallback>Rick</AvatarFallback>
    </Avatar>
  ),
}

export const NoImage = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage alt="rick" />
      <AvatarFallback>Rick</AvatarFallback>
    </Avatar>
  ),
}

export const LongName = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage alt="rick" />
      <AvatarFallback>Richard Daniel Sanchez</AvatarFallback>
    </Avatar>
  ),
}
