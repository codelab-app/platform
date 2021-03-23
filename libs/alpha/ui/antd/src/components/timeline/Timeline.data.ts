import { AtomType, NodeI } from '@codelab/frontend'

export const timelineData: NodeI = {
  type: AtomType.ReactTimeline,
  children: [
    {
      type: AtomType.ReactTimelineItem,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Create a services site 2015-09-01',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTimelineItem,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Solve initial network problems 2015-09-01',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTimelineItem,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Technical testing 2015-09-01',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTimelineItem,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Network problems being solved 2015-09-01',
          },
        },
      ],
    },
  ],
}
