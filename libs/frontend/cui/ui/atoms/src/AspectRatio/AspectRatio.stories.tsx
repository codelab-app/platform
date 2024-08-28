import React from 'react'
import { AspectRatio } from './AspectRatio'

export default {
  component: AspectRatio,
  title: 'Atoms/AspectRatio',
}

export const Default = {
  args: {},
  render: () => (
    <AspectRatio className="bg-muted" ratio={10 / 1}>
      <img
        alt="Photo by Drew Beamer"
        className="size-full rounded-md object-cover"
        src="./abc.jpeg"
      />
    </AspectRatio>
  ),
}
