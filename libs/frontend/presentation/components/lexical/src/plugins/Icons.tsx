import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

import Icon from '@ant-design/icons/lib/components/Icon'

const AlignJustifyOutlineSvg = () => (
  <svg
    fill="currentColor"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
      fillRule="evenodd"
    />
  </svg>
)

export const AlignJustifyOutline = (
  props: Partial<CustomIconComponentProps>,
) => <Icon component={AlignJustifyOutlineSvg} {...props} />
